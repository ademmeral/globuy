import { Router } from 'express';
import { canAdd as canConvert, toVideo } from '../middlewares/media.mjs';
import { notFound } from '../middlewares/middlewares.mjs';

const router = Router();

router.route('/convert/image')
  .post(/*canConvert,*/ toVideo)
  .all(notFound);

router.route('/')
  .all(notFound);

export default router;