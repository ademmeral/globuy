import Brand from '../models/brand.mjs';
import Category from '../models/category.mjs';

export async function canAdd(req, res, next){
  try {
    const brandExists = await Brand.exists({ name: req.body.brand })
    if (!brandExists)
        return res.status(400).send('Invalid brand name!');
    const ctgExists = await Category.exists({ name: req.body.category })
    if (!ctgExists)
        return res.status(400).send('Invalid category name!');
    const { photos } = req.files;
    if (!(photos || photos?.length))
      return res.status(406).send('At least a photo is required!');
    return next()
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message);
  }
}