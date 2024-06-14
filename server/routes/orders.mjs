import { Router } from 'express'
import { checkout, getMany, getOne } from '../controllers/orders.mjs';
import { checkPageAndLimit, notFound } from '../middlewares/middlewares.mjs';

const router = Router();

router.route('/')
    .get(checkPageAndLimit, getMany)
    .all(notFound);

router.route('/checkout')
    .post(checkout)
    .all(notFound);


router.route('/:id')
    .get(getOne)
    .all(notFound);

export default router;