import Ctg from '../models/category.mjs';
import { exclude, toRegExp } from '../utils/utils.mjs';

export async function getTotal(req, res){
  try {
    const total = await Ctg.countDocuments(req.body).exec();
    res.set('Content-Length', isNaN(+total) ? 0 : +total)
    res.status(200).end();
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function getByQuery(req, res){
  try {
    const { skip, limit } = req.query
    const excluded = exclude(req.query, 'page', 'limit', 'skip');
    const regExp = toRegExp(excluded, true);

    const ctgs = await Ctg.find({...excluded, ...regExp})
      .skip(skip).limit(limit).exec();
    return res.status(200).json(ctgs);
    
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}


export async function getMany(req, res){
  try {
    const { limit } = req.query;
    const excluded = exclude(req.query, 'limit', 'page', 'skip')
    const foundCtgs = await Ctg.find(excluded).limit(limit).exec();
    return res.status(200).json(foundCtgs);

  } catch (err) {
    console.log(err);
    res.send(500).send(`${err}`);
  }
}

export async function addMany(req, res){
  try {

    const { data: _data } = req.body;

    if (!_data || !Array.isArray(_data))
      return res.status(400).send('Requesy body must be in type of Array!');

    const data = req.body.data.map( d => ({ ...d, _id: d.name }) )
    await Ctg.create(data);
    return res.status(201).send('Added successfully!');

  } catch (err) {
    console.log(err);
    res.send(500).send(`${err}`);
  }
}

export async function deleteMany(req, res){
  try {
    return;    
  } catch (err) {
    console.log(err);
    res.send(500).send(`${err}`);
  }
}

export async function updateMany(req, res){
  try {
    const { filter, data } = req.body;
    const found = await Ctg.updateMany(filter, data).exec();
    return res.status(200).send('Updated successfully 😊');
  } catch (err) {
    console.log(err);
    res.send(500).send(`${err}`);
  }
}

// SINGLE

export async function getOne(req, res){
  try {
    const { id } = req.params;
    if (id) return res.status(400).send('Id is required!');

    const foundCtg = await Ctg.findById(id).exec();
    if (!foundCtg) return res.status(404).send('No such category!');

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
};

export async function addOne(req, res){
  try {
    const { name: _id } = req.body;
    const newCtg = await Ctg.create({ ...req.body, _id });
    return res.status(201).json(newCtg);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
};

export async function updateOne(req, res){
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send('Id is required!');

    const foundCtg = await Ctg.findByIdAndUpdate(
      id, req.body, { new: true }
    ).exec();
    if (!foundCtg) return res.status(404).send('No such category!');
    return res.status(201).json(foundCtg);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
};

export async function deleteOne(req, res){
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send('Id is required!');

    const foundCtg = await Ctg.findByIdAndDelete(id).exec();
    if (!foundCtg) return res.status(404).send('No such category!');
    return res.status(200).send('Successfully deleted');

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
};