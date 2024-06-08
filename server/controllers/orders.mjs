import Order from '../models/order.mjs'
import Product from '../models/product.mjs'

export async function getMany(req, res){
  try {
    const found = await Order.find(req?.query).exec();
    return res.status(200).json(found);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function addMany(req, res){
  try {
    if (!req.body?.data) 
      return res.status(400).send('Data in type of array is required!');
    
    const inserted = await Order.insertMany(req.body.data).exec();

    return res.status(200).send(inserted);

  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function updateMany(req, res){
  try {
    await Order.updateMany(req.body.filter, req.body.data).exec();
    return res.status(200).send('Updated successfully 😊');
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function deleteMany(req, res){
  try {
    await Order.deleteMany(req.body).exec();
    return res.status(200).send('Deleted successfully 🥲');
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

// SINGLE

export async function getOne(req, res){
  try {
    const found = await Order.findById(req.params.id).exec();
    return res.status(200).json(found);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function getLatest(req, res){
  try {
    const found = await Order.findOne(req.query).sort({ _id: -1 }).exec();
    return res.status(200).json(found);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function addOne(req, res){
  try {
    
    const created = await Order.create(req.body);
    
    return res.status(200).json(created);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function updateOne(req, res){
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body).exec();
    return res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function deleteOne(req, res){
  try {
    await Order.findByIdAndDelete(req.params.id).exec();
    return res.status(200).send('Deleted successfully 🥲');
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}