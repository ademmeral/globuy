import jwt from 'jsonwebtoken';
import mongoose, { pluralize } from 'mongoose';
import fs from 'node:fs/promises';

export const id = () => new mongoose.Types.ObjectId();

export const randomId = (dashes = false) =>
  !dashes ? crypto.randomUUID().replaceAll('-', '') : crypto.randomUUID();

export const exclude = (object, ...args) => {
  return Object.fromEntries(
    Object.entries(object)
      .filter(([k, v]) => !args.includes(k)
      )
  );
};

export const cleanTemp = async (limit = 5) => {
  try {
    const tempFiles = await fs.readdir('temp');
    if (tempFiles.length < limit) return true;
    await Promise.all(
      tempFiles.map(
        tf => fs.rm(`temp/${tf}`)
      )
    );
    return true
  } catch (err) {
    throw err
  }
};


export const isEmpty = (object) => {
  if (!object) throw new Error('Object is required!');
  const entries = Object.entries(object)
  return !entries.length || entries.every(([k, v]) => !k && !v)
};

export const cleanObject = (object) => {
  if (object instanceof Object)
    return Object.fromEntries(
      Object.entries(object).filter(([k, v]) => k && isNaN(v) && v)
    )
  else object.filter(i => !isNaN(i) && isEmpty(i));
}

export const EXPIRATION_DATE = 7 * 24 * 60 * 60 * 1000;
export const createToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: EXPIRATION_DATE });
export const setCookie = (res, token) => {
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.APP !== 'development',
    sameSite: 'strict',
    maxAge: EXPIRATION_DATE
  });
  return true;
};

export const throwMessage = {
  error: (text) => `${text} is required!`,
  unique: (text) => `${text} must be unique!`
}

export const capitalise = text => {
  if (!text) return null;
  return text[0].toUpperCase() + text.slice(1);
}

export const toRegExp = (queries, startsWith = false) => { /* only strings */
  if (queries.constructor.name !== 'Object')
    throw new CustomError('QueryError', 'Queries must be in type of object literal!');

  for (const k in queries)
    if (typeof queries[k] === 'string' && isNaN(queries[k]))
      queries[k] = new RegExp(
        startsWith ? `^${queries[k]}` : `${queries[k]}+`,
        'i')
  return queries;
}

export const schema = {
  required: text => [true, `${text} is required!`],
  unique: text => [true, `${text} must be unique!`],
  min: (num, text) => [num, `${text} must be ${num} at least`],
  max: (num, text) => [num, `${text} can be ${num} at most`],
  validator: (validation, text) => [validation, `We cannot validate the given ${text}`],
  length: (length, text) => [length, `${text} must be in length of ${length}`],
  enum: text => `Unspoorted ${text}`
}

export const flatten = data => [].concat([data]).filter(Boolean)

export class CustomError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
    this.message = message;
  }
}

export const randomIndex = (min = 4, max = 8) => {
  min = Math.min(min, max)
  max = Math.max(1, max) // devision zero problem
  const rand = Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
  if (rand < min) return randomIndex(min, max);
  return rand;
}

export async function randomDocs(schema, arr = [], limit = 4) {
  try {

    const picked = await (await import(`../models/${schema}.mjs`))
      .default.aggregate([
        { $sample: { size: limit } },
        {
          $match: {
            _id: { $nin: arr.map(item => item._id) }
          }
        }
      ]).exec();

    return [...arr, ...picked];

  } catch (err) {
    console.log(err)
    throw err
  }
}
export async function populatedQuery(lookUpConfig = {}, query = {}, schema = 'sale') {
  
  const Model = (await import(`../models/${schema}.mjs`)).default

  const { as, localField } = lookUpConfig;
  const entries = Object.entries(query).map(([k, v]) => [`${as}.${k}`,v])
  const queries = Object.fromEntries(entries);
  
  const result = Model.aggregate([
    { $unwind: `$${localField}` },
    { $lookup: lookUpConfig },
    { $unwind: `$${as}` },
    {
      $match: queries
    },
  ]).exec();
  return result;
};