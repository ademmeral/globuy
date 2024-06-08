import { Schema, model } from 'mongoose';
import { schema } from '../utils/utils.mjs';

const BrandSchema = new Schema({
  _id: String,
  name: {
    type: String,
    required: schema.required('Brand name'),
    unique : schema.unique('Brand name'),
    trim: true,
  },
  logo: {
    type: String,
    default: "",
    trim: true,
  },
  desc: {
    type: String,
    default: "",
    trim: true,
  }
}, { timestamps: true })

export default model('Brand', BrandSchema)