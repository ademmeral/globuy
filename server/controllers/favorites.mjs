import Favorite from '../models/favorite.mjs'
import User from '../models/user.mjs'
import { id } from '../utils/utils.mjs';

export async function getTotal(req,res){
  try {
    const total = await Favorite.countDocuments(req.query).exec();
    res.set('Content-Length', total);
    return res.status(200).end()
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`);
  }
}

export async function getMany(req, res){
  try {
    const favs = await Favorite.find(req.query).exec();
    return res.status(200).json(favs);
    
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`);
  }
}

export async function addOne(req,res){
  try {
    const exist = await Favorite.exists(req.body).exec();
    if (exist) return res.status(409).send('Already in your favorites!');

    const newFav = await Favorite.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId, 
      { $push: { 'favorites': newFav._id } }, { new: true }
    ).exec();
    return res.status(201).json(updatedUser.favorites);
    
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function deleteOne(req, res){
  try {
    await Favorite.deleteMany({ _id: req.params.id }).exec();
    await User.updateOne(
      { 
        $pullAll: 
        { 
          favorites: [{ _id: req.params.id }]
        } 
      }
    ).exec();
    return res.status(200).end();

  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`)
  }
}

export async function updateOne(req, res){
  try {
    const foundFav = await Favorite.findByIdAndUpdate(
      req.params.id, req.body
    ).exec();
    return res.status(200).json(foundFav);
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`)
  }
}

export async function getOne(req, res){
  try {
    const foundFav = await Favorite.findById(req.params.id).exec();
    if (!foundFav) return res.status(404).send('Not found!');
    return res.status(200).json(foundFav);
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`)
  }
}

export const toggleOne = async (req, res) => {
  try {
    const exist = await Favorite.findOne(req.body).exec();
    if (exist){
      req.params.id = exist._id;
      return deleteOne(req, res)
    }
    return addOne(req, res);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
} 