import jwt from 'jsonwebtoken';
import { CustomError, capitalise } from '../utils/utils.mjs';
import { uploadPhoto, uploadVideo } from '../utils/cloudinary.mjs';
import { findByEmail } from '../controllers/user.mjs';

export const verifyJwt = (req, res, next) => {
  let token = req.cookies?.jwt;

  if (!token)
    token = req.headers['authorization']?.replace('Bearer ', '') ||
      req.headers['Authorization']?.replace('Bearer', '');

  if (!token) return res.status(203).end();

  return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).send(
      `${new CustomError('TokenError', 'Invalid or expired token!')}`
    );
    req.owner = decoded.email;
    return next();
  });
}

export const authorize = async (req, res, next) => {
  try {
    const foundUser = await findByEmail(req.owner)
    if (!foundUser.isAdmin) return res.status(401).send('Not allowed!');
    return next();
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message);
  }

};

export const authenticate = async (req, res) => {
  try {
    const foundUser = await findByEmail(req.owner);
    return res.status(200).json(foundUser);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

export const handleCapitalisation = (req, res, next) => {
  if ('category' in req.body)
    req.body.category = capitalise(req.body.category);
  if ('keywords' in req.body)
    req.body.keywords = req.body.keywords.replace(/[^a-z,'\-]/gi, ',').split(',')
      .map(kw => capitalise(kw.trim())).filter(Boolean)
  else if (req.method === 'POST')
    return res.status(400).send('There is something wrong with the keywords!');
  return next();
}

export const notFound = (req, res) =>
  res.status(404).json('Not found!');


export function checkPageAndLimit(req, res, next) {
  try {
    const { page, limit } = req.query;
    if (!(page || limit) || isNaN(page) || isNaN(limit)) return res.status(400)
      .send(
        'Page & limit are required and must be in type of number,\
          We cannot put the whole database in front of you at once'
      );
    req.query.page = +page;
    req.query.limit = +limit;
    req.query.skip = (+page - 1) * Math.min(+limit, 10);
    return next();
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message)
  }
}