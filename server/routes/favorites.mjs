import { Router } from 'express';
import { getMany, getTotal, getOne, deleteOne, addOne, toggleOne } from '../controllers/favorites.mjs';
import { notFound } from '../middlewares/middlewares.mjs'

const router = Router();

router.route('/')
  .get(getMany)
  .post(addOne)
  .patch(toggleOne)
  .head(getTotal)
  .all(notFound);

router.route('/:id')
  .delete(deleteOne)
  .get(getOne)
  .all(notFound);
  
export default router;