import { Router } from 'express';
import {
  getByQery, getMany, queryTotal, updateMany,
  getOne, addOne, updateOne, deleteOne,
  getFeatureds,
  cleanArrayProp,
  removeProp,
} from '../controllers/products.mjs';
import { canAdd } from '../middlewares/products.mjs';
import {
  notFound, authorize, verifyJwt, handleCapitalisation,
  checkPageAndLimit as canGet,
} from '../middlewares/middlewares.mjs';
import { setPhotos } from '../middlewares/media.mjs';

const router = Router();

router.route('/')
  .get(canGet, getMany)
  .put(handleCapitalisation, updateMany, setPhotos('products'))
  .post(/*verifyJwt, authorize, */canAdd, handleCapitalisation, addOne, setPhotos('products'))
  .head(queryTotal)
  .patch(/*cleanArrayProp, */removeProp)
  .all(notFound);

router.route('/single')
  .post(verifyJwt, authorize, addOne, setPhotos('products'))
  .all(notFound);

router.route('/featured')
  .get(canGet, getFeatureds)
  .all(notFound);

router.route('/search')
  .get(canGet, getByQery)
  .all(notFound);

router.route('/:id')
  .get(getOne)
  .put(/*verifyJwt, authorize, */updateOne, setPhotos('products'))
  .delete(verifyJwt, authorize, deleteOne)
  .all(notFound);

export default router;