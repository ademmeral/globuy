import Payment from '../models/payment.mjs'
import { checkout } from '../utils/stripe.mjs';

export async function getMany(req, res){
  try {
    const found = await Payment.find(req?.query).exec();
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
    if (('productId' in req.body)) 
      return res.status(400).send('Product ID is required!');
    
    const config = {
      data : req.body.data,
      successPath : '/payment/success',
      cancelPath : '/payment/error',
    }
    const session = await checkout(config);
    const { id, url } = session;
    const mapped = req.body.data.map(d => ({ ...d, transactionId: id }));

    const productIds = req.body.data.map(d => d.product);
    foundProducts = await Product.find().where('_id').in(productIds).exec();
    updated = foundProducts.map(
      p => ({ ...p, stock: Math.max(0, p.stock - 1) })
    );

    const [inserted,] = await Promise.all([
      Payment.insertMany(mapped).exec(),
      Product.updateMany({ '_id': { $in: productIds } }, updated).exec()
    ]);
    return res.status(200).send({ result: inserted, url });

  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function updateMany(req, res){
  try {
    const { filter, data } = req.body;
    await Payment.updateMany(filter, data).exec();
    return res.status(200).send('Updated successfully 😊');
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function deleteMany(req, res){
  try {
    await Payment.deleteMany(req.body).exec();
    return res.status(200).send('Deleted successfully 🥲');
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

// SINGLE

export async function getOne(req, res){
  try {
    const found = await Payment.findById(req.params.id).exec();
    return res.status(200).json(found);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}
export async function getLatest(req, res){
  try {
    const found = await Payment.findOne().sort({ _id: -1 }).exec();
    return res.status(200).json(found);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function addOne(req, res){
  try {
    if (!req.body.productId)
      return res.status(400).send('Product ID is required!');
    
    const foundProduct = await Product.findById(req.body.productId).exec();
    if (!foundProduct) return res.status(404).send('No such product to order!');
    foundProduct.stock = Math.max(0, foundProduct - 1);

    const { url, id } = checkout({ data: [req.body] });
    const [created,] = await Promise.all([
      Payment.create({ ...req.body, transactionId: id }),
      foundProduct.save().exec()
    ]);

    return res.status(201).send({ ...created, url });
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function updateOne(req, res){
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body).exec();
    return res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

export async function deleteOne(req, res){
  try {
    await Payment.findByIdAndDelete(req.params.id).exec();
    return res.status(200).send('Deleted successfully 🥲');
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}