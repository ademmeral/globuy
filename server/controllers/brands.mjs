import Brand from '../models/brand.mjs';
import { exclude, toRegExp } from '../utils/utils.mjs';

export async function getTotal(req, res){
  try {
    const total = await Brand.countDocuments(req.body).exec();
    res.set('Content-Length', isNaN(+total) ? 0 : +total)
    res.status(200).end();
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function getByQuery(req, res){
  try {
    const { skip, limit } = req.query;
    const excluded = exclude(req.query, 'page', 'limit', 'skip')
    const regExp = toRegExp(excluded, true);

    const brands = await Brand.find(regExp).skip(skip).limit(limit).exec();
    return res.status(200).json(brands);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function getMany(req, res){
  try {
    const { limit } = req.query;
    const excluded = exclude(req.query, 'limit', 'page', 'skip')
    const foundBrands = await Brand.find(excluded).limit(limit).exec();
    return res.status(200).json(foundBrands);

  } catch (err) {
    console.log(err);
    res.send(500).send(`${err}`);
  }
}

export async function addMany(req, res){
  try {
    const { data: _data } = req.body;

    if (!_data || !Array.isArray(_data))
      return res.status(400).send('Data must be in type of Array!');

    const data = req.body.data.map( d => ({ ...d, _id: d.name }) )
    await Brand.insertMany(data)
    return res.status(201).send('Added! successfully');
    
  } catch (err) {
    console.log(err);
    return res.send(500).send(`${err}`);
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
    return;    
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

    const foundBrand = await Brand.findById(id).exec();
    if (!foundBrand) return res.status(404).send('No such brand!');
    return res.status(200).json(foundBrand);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
};

export async function addOne(req, res){
  try {
    
    const newBrand = await Brand.create({ ...req.body, _id: req.body.name });
    return res.status(201).json(newBrand);
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
};

export async function updateOne(req, res){
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send('Id is required!');

    const foundBrand = await Brand.findByIdAndUpdate(
      id, req.body, { new: true }
    ).exec();
    if (!foundBrand) return res.status(404).send('No such brand!');
    return res.status(201).json(foundBrand);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
};

export async function deleteOne(req, res){
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send('Id is required!');

    const foundBrand = await Brand.findByIdAndDelete(id).exec();
    if (!foundBrand) return res.status(404).send('No such brand!');
    return res.status(200).send('Deleted Successfully!');

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`)
  }
};