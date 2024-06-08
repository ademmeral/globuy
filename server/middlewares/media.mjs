import { uploadPhoto, uploadVideo } from '../utils/cloudinary.mjs';
import { CustomError, cleanTemp, exclude, id } from '../utils/utils.mjs';
import pluralize from 'pluralize';
import ffmpeg from 'fluent-ffmpeg'
import fs from 'node:fs/promises';

export const setPhotos = (preset = '') => async (req, res) => {
  if (!req?.files) res.status(200).end();
  const [key] = Object.keys(req.files);
  const singular = pluralize.singular(preset);

  try {
    if (!preset) return res.status(406).send('Preset is required!');
    const Model = (await import(`../models/${singular}.mjs`)).default;

    let found = await Model.findById(req.params.id)
    const config = { _id: found._id, preset };

    const result = (await Promise.all(
      [].concat(req.files[key]).filter(Boolean).flatMap(
        f => uploadPhoto({ ...config, path: f.tempFilePath, tags: req.body.keywords })
      )
    )).filter(Boolean);

    found[key] = result;
    found = await found.save();
    return res.status(200).json(found);

  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message)
  }
}

export const setVideos = (preset = 'stories') => {
  const singular = pluralize.singular(preset);
  return async (req, res, next) => {
    const [key] = Object.keys(req.files);
    if (!key) return res.status(406)
      .send('Story is required!');
    console.log(req.files)
    try {
      const Model = (await import(`../models/${singular}.mjs`)).default,
        found = await Model.findById(req.params.id).exec(),
        config = { _id: req.params.id, preset };
      const result = await Promise.all(
        [].concat(req.files[key]).flatMap(
          (f,i) => {
            const conf = {
              ...config, 
              path: f.tempFilePath, 
              index: i, 
            };
            if (f.mimetype.startsWith('video'))
              return uploadVideo(conf)
            else if (f.mimetype.startsWith('image'))
              return uploadPhoto(conf);
          })
      );
      found[key] = result;
      await found.save();
      return res.status(200).json(found);

    } catch (err) {
      console.log(err)
      return res.status(500).send(`${err}`);
    }
  }
}

const metadata = async (input) => new Promise((resolve, reject) => {
  return ffmpeg.ffprobe(input, (err, mdata) => {
    if (err) return reject(err);
    return resolve(mdata)
  });
})

const split = async (input, duration = 10, startTime = 0) => {
  let pathList = [];

  const letstry = async (input, duration = 10, startTime = 0) => {

    return await new Promise(async (resolve, reject) => {

      const outputPath = `${process.cwd()}/temp/${id()}.mp4`;
      pathList = pathList.concat(outputPath);
      const { streams: [, { duration: length }] } = await metadata(input)

      ffmpeg(input)
        .setStartTime(startTime)
        .setDuration(duration) // Split every 10 seconds, adjust as needed
        .output(outputPath)
        .on('end', () => resolve(pathList))
        .on('error', reject)
        .run();
      if (startTime < Math.round(length) - duration)
        return letstry(input, duration, (startTime + duration));
      return resolve(pathList);
    });
  }

  return await letstry(input, duration = 10, startTime = 0);
}

export const splitIntoClips = async (req, res, next) => {
  try {
    if (!req?.files) return res.status(406)
      .send('Story is required!');

    const [key] = Object.keys(req.files);

    let dirs = await Promise.all(
      [].concat(req.files[key]).filter(Boolean)
        .flatMap(f => split(f.tempFilePath))
    );
    dirs = dirs.flatMap(d => d); // Boolean does not work properly
    return next();
  } catch (err) {
    console.log(err)
    return res.status(500).send(
      `${new CustomError('MediaError', err.message)}`
    );
  }
};

export const canAdd = async (req, res, next) => {
  const [files] = Object.entries(req.files || {});

  if (!files)
    return res.status(406).send('No input to handle!');
  req.body.duration = Math.min(5, req.body?.duration || 5);
  return next();
};

// const path = "https://res.cloudinary.com/demo/image/upload/v1668092270/docs/retirement.jpg"
export const toVideo = async (req, res) => {
  try {
    const path = req.body.src;
    const outp = await new Promise((resolve, reject) => {

      const output = `${process.cwd()}/temp/output.mp4`;
      ffmpeg(path)
        // .format(req.body.format)
        .loop(req.body.duration)
        .fps(29.7)
        .videoBitrate('96k')
        .size('360x?').aspect('3:5').autopad(true)
        .noAudio()
        .output(output)
        .on('end', () => resolve(output))
        .on('error', reject)
        .run();
    });

    const modified = outp.split('\\').at(-1);
    return res.status(200).send(outp);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  } //finally { await cleanTemp() }
}