import { Router } from 'express'
import { 
  addOne, deleteMany, deleteOne, 
  getMany, getOne, getTotal, updateMany, updateOne 
} from '../controllers/comments.mjs';
import { notFound } from '../middlewares/middlewares.mjs';

const router = Router();

router.route('/')
  .get(getMany)
  .post(addOne)
  .put(updateMany)
  .delete(deleteMany)
  .head(getTotal)
  .all(notFound);

router.route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne)
  .all(notFound);

export default router;