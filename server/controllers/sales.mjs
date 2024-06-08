import Sale from '../models/sale.mjs'
import { exclude, populatedQuery, toRegExp } from '../utils/utils.mjs';

export async function getByQuery(req, res){
  try {
    const lookUpConfig = {
      from: 'products',
      localField: 'product',
      foreignField: "_id",
      as: "product"
    }
    const regExp = toRegExp(req.query, true);
    const result = await populatedQuery(lookUpConfig, regExp)
    return res.status(200).json(result);
  } catch (err) {
    console.log(err)
    return res.status(200).send(`${err}`);
  }
}

export async function getMany(req, res){
  try {
    
    const { userId } = req.query;
    const excluded = exclude(req.query, 'page', 'limit', 'userId');
    
    if (userId && Object.keys(excluded).length){
      req.query = excluded;
      return getByQuery(req, res);
    }

    const found = await Sale.find({ ...excluded, userId });
    return res.status(200).json(found);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function addMany(req, res){
  try {
    const found = await Sale.insertMany(req.body);
    return res.status(200).json('Added successfully 😊');
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function updateMany(req, res){
  try {
    const found = await Sale.updateMany(req.body.filter, req.body.data);
    return res.status(200).json('Updated successfully 😊');
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function deleteMany(req, res){
  try {
    const found = await Sale.deleteMany(req.body);
    return res.status(200).json('Deleted successfully 🥲');
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

// SINGLE

export async function getOne(req, res){
  try {
    const found = await Sale.findById(req.params.id);
    return res.status(200).json(found);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function addOne(req, res){
  try {
    const found = await Sale.create(req.body);
    return res.status(200).json(found);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function updateOne(req, res){
  try {
    const found = await Sale.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json(found);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function deleteOne(req, res){
  try {
    const found = await Sale.findByIdAndDelete(req.params.id);
    return res.status(200).json('Deleted successfully 🥲');
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}
