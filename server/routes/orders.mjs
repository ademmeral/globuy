import { Router } from 'express';
import { authenticate, authorize, notFound, verifyJwt } from '../middlewares/middlewares.mjs';
import { 
  addMany, addOne, deleteMany, deleteOne, getLatest, getMany, 
  getOne, updateMany, updateOne
} from '../controllers/orders.mjs';

const router = Router();

router.route('/')
  .get(verifyJwt, getMany)
  .post(verifyJwt, authorize, addMany)
  .put(verifyJwt, authorize, updateMany)
  .delete(verifyJwt, authorize, deleteMany)
  .all(notFound);

router.route('/single')
  .post(verifyJwt, addOne)
  .get(verifyJwt, getLatest)
  .all(notFound);

router.route('/:id')
  .get(verifyJwt, getOne)
  .put(verifyJwt, updateOne)
  .delete(verifyJwt, deleteOne)
  .all(notFound);

export default router;