import Product from "../models/product.mjs";
import Rating from "../models/rating.mjs";
import Order from "../models/order.mjs";
import { exclude, toRegExp, randomDocs } from "../utils/utils.mjs";
import order from "../models/order.mjs";
import { DOC_LIMIT } from "../constants/constants.mjs";

export async function queryTotal(req, res){
  try {
    const total = await Product.countDocuments(req.query).exec();
    res.set('Content-Length', total)
    return res.end();

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function getMany(req, res){
  try {
    const { limit, skip } = req.query,
    excluded = exclude(req.query, 'page', 'limit', 'skip'),
    products = await Product.find(excluded).skip(skip).limit(limit).exec();
    return res.status(200).json(products);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function updateMany(req,res){
  try {
    
    if (!(req.body.filter || req.body.data))
      return res.status(400).send('Data and filter objects are required!');

    await Product.updateMany(req.body.filter, req.body.data).exec();
    return res.status(200).send('Updated successfully 😊');

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export const getByQery = async (req, res) => {
  try {
    const { limit, skip } = req.query, 
    excluded = exclude(req.query, 'page', 'limit', 'skip');
    let regExp = toRegExp(excluded); // $regex : ..., $options : i ;)

    if ('star' in req.query)
    {
      const ratings = await Rating.find({ star: { $gt: +req.query.star - 0.1 } }),
      ids = ratings.map(r => r.product);
      regExp = { ...regExp, _id: { $in: ids } }
      delete regExp.star;
    }

    const products = await Product.find(regExp).skip(skip).limit(limit).exec();
    return res.status(200).json(products);

  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
}

// SINGLE
export const getOne = async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id).exec();
    return res.status(200).json(foundProduct)
  } catch (err) {
    console.log(err)
    res.status(500).send(`${err}`)
  }
}

export async function addOne(req, res, next){
  try {
    
    let newProduct = await Product.create(req.body);
    
    const [key] = Object.keys(req.files);
  if (!key) return res.status(201).json(newProduct);
    req.params.id = newProduct._id
    return next();

  } catch (err) {
    console.log(err)
    return res.status(500).send( `${err}` );
  }
}

export async function updateOne(req, res){
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    ).exec();
    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err)
    return res.status(500).send( `${err}` );
  }
}

export async function deleteOne(req, res){
  try {
    const newProduct = await Product.findByIdAndDelete(req.params.id).exec();
    return res.status(201).json(newProduct);
  } catch (err) {
    console.log(err)
    return res.status(500).send( `${err}` );
  }
}

export async function getFeatureds(req, res){
  try {
    const { userId, limit : lm } = req.query;
    const limit = isNaN(+lm) ? DOC_LIMIT : +lm;

    if (!userId)
    {
      const random = await randomDocs('product', [], limit); // 1
      return res.status(202).json(random);
    }
    const [ratings, orders] = await Promise.all([ // 2
      Rating.find({ userId: userId }).exec(),
      Order.find({ userId: userId }).exec(),
    ]);
    // IDS
    const _3stars = ratings.filter(r => r.star > 3).map(r => r.product),
    _4stars = ratings.filter(r => r.star < 4).map(r => r.product._id),
    ordersIds = orders.map(o => o.product._id),
    willExclude = ordersIds.concat(_4stars)
      .reduce((arr, id) => {
        if (!arr.includes(id)) arr.push(id);
        return arr;
      }, []),
    keywords = [...new Set(ratings.flatMap(r => r.product.keywords))],

    byKeywords = await Product.find({
      $and: [
        { keywords: { $in: keywords } },
        { _id: { $nin: willExclude } },
        { _id: { $nin: _3stars.map(p => p._id) } }
      ]
    }).exec();

    const found = [..._3stars, ...byKeywords].reduce((arr, item) => {
      const exists = arr.find(i => i._id === item._id);
      if (!exists) arr.push(item)
        return arr;
    }, []).slice(0, limit);

    if (found.length < limit)
      {
        const random = await randomDocs('product', found, limit - found.length);
        return res.status(200).json(random);

      };
      return res.status(200).json(found);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export const cleanArrayProp = async (req, res) => {
  try {
    const found = await Product.updateMany({}, { [req.body.prop]: [] })
    return res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`)
  }
}
export const removeProp = async (req, res) => {
  try {
    const found = await Product.updateMany({}, { $unset: { [req.body.prop]: 1 } })
    return res.status(200).end();
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`)
  }
}