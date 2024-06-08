import { Router } from 'express';
import { addOne, getMany, deleteOne, getTotal, updateOne, getOne, addMany } from '../controllers/ratings.mjs';
import { authenticate, authorize, notFound, verifyJwt } from '../middlewares/middlewares.mjs';

const router = Router();

router.route('/')
  .get(getMany)
  .post(verifyJwt, authorize, addMany)
  .head(getTotal)
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