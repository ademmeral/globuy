import express from "express";

import { 
  register, deleteOne, getOne, login, logout, updateOne
} from "../controllers/user.mjs";
import { 
  authorize, authenticate, notFound, verifyJwt,
} from "../middlewares/middlewares.mjs";
import { setPhotos } from "../middlewares/media.mjs";

const router = express.Router();

router.route('/register')
  .post(register)
  .all(notFound);


router.route('/login')
  .post(login)
  .all(notFound);

router.route('/logout')
  .get(verifyJwt, logout)
  .all(notFound);

router.route('/auth')
  .get(verifyJwt, authenticate)
  .all(notFound);

router.route('/:id')
  .post(verifyJwt, setPhotos('users'), updateOne)
  .put(verifyJwt, authorize, setPhotos('users'), updateOne)
  .get(verifyJwt, authorize, getOne)
  .delete(verifyJwt, authorize, deleteOne)
  .all(notFound);

export default router;