import { Router } from 'express' 
import { notFound } from '../middlewares/middlewares.mjs';
import { 
  getMany, addMany, updateMany, deleteMany, getOne, 
  addOne, updateOne, deleteOne, getByQuery 
} from '../controllers/sales.mjs';

const router = Router();

router.route('/')
  .get(getMany)
  .post(addMany)
  .put(updateMany)
  .delete(deleteMany)
  .all(notFound);

router.route('/search')
  .get(getByQuery)
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