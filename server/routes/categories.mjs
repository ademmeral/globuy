import { Router } from 'express';
import { notFound } from '../middlewares/middlewares.mjs';
import {
  getMany, addMany, getTotal, updateMany, deleteMany,
  getOne, addOne, updateOne, deleteOne,
  getByQuery,
} from "../controllers/categories.mjs";
import { checkPageAndLimit as canGet } from '../middlewares/middlewares.mjs'

const router = Router();

router.route('/')
  .get(canGet, getMany)
  .post(addMany)
  .head(getTotal)
  .put(updateMany)
  // .delete(deleteMany)
  .all(notFound);


router.route('/search')
  .get(canGet, getByQuery)
  .all(notFound);

router.route('/single')
  .post(addOne)
  .all(notFound);

router.route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne)
  .all(notFound);

export default router;