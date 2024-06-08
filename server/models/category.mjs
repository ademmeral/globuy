import { Schema, model } from 'mongoose';
import { schema } from '../utils/utils.mjs';

export const CategorySchema = Schema({
  _id : String,
  name : {
    type: String,
    required : schema.required('Category name'),
    unique : schema.unique('Category name'),
    trim : true,
  },
  desc : {
    type: String,
    default : '',
    trim: true
  }
}, { timestamps: true });

export default model('Category', CategorySchema);