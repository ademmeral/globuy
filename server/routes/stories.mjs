import { Router } from 'express' 
import { canAdd, setVideos, splitIntoClips } from '../middlewares/media.mjs';
import { notFound, checkPageAndLimit } from '../middlewares/middlewares.mjs';
import { getMany, addMany, updateMany, deleteMany, getOne, addOne, updateOne, deleteOne } from '../controllers/stories.mjs';

const router = Router();

router.route('/')
  .get(checkPageAndLimit, getMany)
  // .post(addMany, setVideos('stories'))
  .put(updateMany)
  .delete(deleteMany)
  .all(notFound);

router.route('/single')
  .post(canAdd, addOne, /*splitIntoClips,*/ setVideos('stories'))
  .all(notFound);

// router.route('/single/split')
//   .get(splitMedia)
//   .all(notFound);
  
router.route('/:id')
  .get(getOne)
  .put(updateOne)
  .delete(deleteOne)
  .all(notFound);

export default router;