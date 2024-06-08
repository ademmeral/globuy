import express from "express";
import { updateMany, getMany, deleteMany, queryTotal, getByQuery } from '../controllers/users.mjs'
import { authorize, notFound, verifyJwt } from '../middlewares/middlewares.mjs';
import { getOne } from "../controllers/user.mjs";

const router = express.Router();

express().use(verifyJwt, authorize);

router.route('/')
  // .all(verifyJwt, authorize)
  .put(updateMany)
  .get(getMany)
  .delete(deleteMany)
  .head(queryTotal)
  .all(notFound);

router.route('/search')
  .get(getByQuery)
  .head(queryTotal)
  .all(notFound);

router.route('/:id')
  .get(getOne)
  .all(notFound);

export default router;