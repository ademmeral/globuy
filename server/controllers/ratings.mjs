import Product from '../models/product.mjs';
import Rating from '../models/rating.mjs'
import { id } from '../utils/utils.mjs';

export async function getTotal(req, res){
  try {
    const total = await Rating.countDocuments(req.query);
    return res.status(200).json(total);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function getMany(req, res){
  try {
    const result = await Rating.find(req.query);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function addMany(req, res){
  try {
    const result = await Rating.insertMany(req.body.data);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function getOne(req, res){
  try {
    const result = await Rating.findById(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function addOne(req, res) {
  try {
    const foundRating = await Rating.findOne({
      product: req.body.product,
      userId: req.body.userId,
    });

    if (foundRating) {
      req.params.id = foundRating._id;
      return updateOne(req, res);
    }

    const newRating = await Rating.create(req.body);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.body.product,
      {
        $addToSet: {
          ratings: newRating._id,
        },
      },
      { new: true } // To return the updated product
    );

    return res.status(200).json(newRating);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`${err}`);
  }
}

export async function deleteOne(req, res){
  try {
    await Rating.findByIdAndDelete(req.params.id)
    await User.updateOne(
      { 
        $pullAll: 
        { 
          ratings: req.params.id 
        } 
      }
    )
    return res.status(201).end();
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function updateOne(req, res){
  try {
    const result = await Rating.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(result);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}