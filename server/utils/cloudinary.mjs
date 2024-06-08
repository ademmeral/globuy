import { v2 as cloudinary } from 'cloudinary';
import { cloudConfig } from '../config/cloudinary.mjs';
import { randomId, exclude, cleanTemp, CustomError } from '../utils/utils.mjs';

export const uploadPhoto = async (config) => {
  const conf = cloudConfig(config.preset);
  cloudinary.config(conf);
  try {
    const result = await cloudinary.uploader.upload(config.path, {
      resource_type: 'image',
      public_id: `${config.preset}_${config._id}_${config.index}`,
      folder: `${config.preset}_${config._id}`,
      format: 'avif',
      crop: 'fill',
      colors: true,
      // exif : true,
      transformation: {
        width: 640,
        height: 400,
        crop: 'fit',
      },
      ...config,
    });
    const excluded = exclude(result, 'api_key');
    await cleanTemp();
    return excluded;
  } catch (err) { throw err }

};

export const uploadVideo = async (config) => {
  if (!config?._id) throw new CustomError(
    'MediaError',
    'ID is required!'
  );
  const conf = cloudConfig(config.preset);
  cloudinary.config(conf);
  try {
    const result = await cloudinary.uploader.upload(config.path, {
      resource_type: 'video',
      public_id: `${config.preset}_${config._id}_${config.index}`, // only one
      folder: `${config.preset}_${config._id}`,
      format: 'webm',
      chunk_size: 8_000_000, // the larger chunk size of file is, the faster you upload it
      // eager: [
      //   { height: 420, crop: 'fit', audio_codec: 'mp3' },
      //   { height: 480, crop: 'fit', audio_codec: 'mp3' },
      // ],
      eager_async: true,
      // eager_notification_url: 'https://localhost:3000/media/failed',
      colors : true,
      // exif : true,
      transformation: {
        quality: 75,
        // duration : 10,
        // start_offset : 0,
        // end_offset : 10,
        // width: 240,
        height : 480,
        crop : 'fill',
        // gravity : 'auto',
        // aspect_ratio : '9.16',
        // background : 'blurred',
      },
      ...config,
    });
    const excluded = exclude(result, 'api_key');
    return excluded;
  } catch (err) {
    console.log(err);
    throw new CustomError('MediaError', err.message);
  } finally {
    await cleanTemp();
  }

};