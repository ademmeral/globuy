import User from '../models/user.mjs';

export async function getMany(req,res){
  try {

    const { page: $page, limit: $limit } = req.query;

    if ( isNaN($page) || isNaN($limit) )
      return res.status(400).send('Page and limit in number are required 🙃');

    const $skip = $page < 2 ? 0 : (+$page - 1) * +Math.min($limit, 10); 
    const users = await User.find().skip($skip).limit($limit).exec();
    return res.status(200).json(users);

  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function updateMany(req,res){
  try {
    await User.updateMany(req.body).exec();
    res.status(200).send('Updated successfully 😊')
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function deleteMany(req,res){
  try {
    return;
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function queryTotal(req, res){
  try {

    const total = await User.countDocuments(req.query).exec();
    return res.status(200).send(total);
    
  } catch (err) {
    console.log(err)
    return res.status(500).send(`${err}`);
  }
}

export async function getByQuery(req, res){
  try {

    const { page, limit } = req.query;
    const excluded = exclude(req.query, 'page', 'limit')
    if ( isNaN(+page) || isNaN(+limit) )
      return res.status(400).send(
        'Page and limit is required 😐'
      );

    const $skip = page > 1 ? (+page - 1) * Math.min(limit, 10) : 0;

    const result = await User.find(excluded)
      .skip($skip).limit(limit).exec();

    return res.status(200).json(result);

  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
};

