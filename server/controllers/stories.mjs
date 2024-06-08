import Story from '../models/story.mjs'
import { exclude } from '../utils/utils.mjs';

export async function getMany(req, res){
  try {
    const excluded = exclude(req.query, 'page', 'limit', 'skip');
    console.log(excluded)
    const found = await Story.find(excluded).exec();
    return res.status(200).json(found)
  } catch (err) {
    return res.status(500).send(`${err}`)
  }
}

export async function addMany(req, res){
  try {
    const found = await Story.insertMany(req.body).exec();
    return res.status(200).json('Added successfully 😊')
  } catch (err) {
    return res.status(500).send(`${err}`)
  }
}

export async function updateMany(req, res){
  try {
    const updated = await Story.updateMany(req.body.filter, req.body.data).exec();
    return res.status(200).json('Updated successfully 😊')
  } catch (err) {
    return res.status(500).send(`${err}`)
  }
}

export async function deleteMany(req, res){
  try {
    const deleted = await Story.find(req.body.filter).exec();
    return res.status(200).json('Deleted successfully 😊')
  } catch (err) {
    return res.status(500).send(`${err}`)
  }
}

export async function getOne(req, res){
  try {
    const found = await Story.findOne(req.query).exec();
    return res.status(200).json(found)
  } catch (err) {
    return res.status(500).send(`${err}`)
  }
}

export async function addOne(req, res, next){
  try {
    const exists = await Story.findOne(req.body).exec();
    if (exists){
      req.params.id = exists._id;
      await Story.replaceOne({_id : exists._id}, req.body).exec();
      return next();
    }
    const created = await Story.create(req.body);
    req.params.id = created._id;
    return next();
    // return res.status(200).json(created)
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
}

export async function updateOne(req, res){
  try {
    const updated = await Story.findByIdAndUpdate(req.params.id, req.body).exec();
    return res.status(200).json(updated)
  } catch (err) {
    return res.status(500).send(`${err}`)
  }
}

export async function deleteOne(req, res){
  try {
    const deleted = await Story.find(req.body.filter).exec();
    return res.status(200).json('Deleted successfully 😊')
  } catch (err) {
    return res.status(500).send(`${err}`)
  }
}