import Comment from '../models/comment.mjs'
import Product from '../models/product.mjs'
import { id } from '../utils/utils.mjs';

export const getTotal = async (req, res) => {
  try {
    const total = await Comment.countDocuments(req.query).exec();
    res.set('Content-Length', +total);
    return res.status(200).end();
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`);
  }
}

export const getMany = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const comments = await Comment.find(req.query)
      .limit(page * limit).exec();
    res.status(200).json(comments);
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`);
  }
};

export const updateMany = async (req, res) => {
  try {
    await Comment.updateMany(req.query, req.body).exec();

    res.status(200).send('Updated successfully!');
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`);
  }
};

export const deleteMany = async (req, res) => {
  try {
    await Comment.deleteMany(req.query, req.body).exec();
    res.status(200).send('Deleted successfully!');
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`);
  }
};

// SINGLE

export const getOne = async (req, res) => {
  try {
    const found = await Comment.findById(req.params.id).exec();
    res.status(200).json(found);
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`)
  }
}
export const addOne = async (req, res) => {
  try {
    const { productId, user } = req.body
    const exist = await Comment.exists({ productId, user }).exec();
    if (exist) return res.status(409).send('Already exist!');
    
    const newComment = await Comment.create(req.body);
    const updatedUser = await Product.findByIdAndUpdate(
      req.body.productId,
      { $push: { comments: newComment._id } },
      { new: true }
      ).exec();
    return res.status(201).json(newComment);
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`);
  }
}

export const deleteOne = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id).exec();
    await Product.updateOne(
      { 
        $pullAll: 
          { comments: [{ _id: req.params.id }] } 
      }
    ).exec();
    res.status(200).end();
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`);
  }
}

export const updateOne = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    ).exec();
    res.status(200).json(updated);
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`);
  }
}