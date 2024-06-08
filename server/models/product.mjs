import { Schema, model } from "mongoose";
import autopop from 'mongoose-autopopulate';
import { schema } from '../utils/utils.mjs';

export const ProductSchema = Schema({
  title : {
    type : String,
    required : schema.required('Title'),
    trim : true,
  },
  desc : {
    type : String,
    required : schema.required('Description'),
    trim : true,
  },
  photos : {
    type: [Object],
    required : schema.required('At least a photo'),
  },
  stock : {
    type : Number,
    required : schema.required('Stock info'),
    min : schema.min(0, 'Stock')
  },
  price : {
    type : Number,
    required : schema.required('Price'),
    min : schema.min(10, 'Price')
  },
  category : {
    type: Schema.Types.String,
    ref : 'Category',
    required : schema.required('Category'),
    autopopulate: true,
  },
  keywords : {
    type : [String],
    min: schema.min(1, 'Keyword'),
  },
  brand : {
    type: Schema.Types.String,
    ref : 'Brand',
    required : schema.required('Brand'),
    autopopulate : true,
  },
  comments: [
    { type: Schema.Types.ObjectId, ref: 'Comment', autopopulate: true }
  ],
  ratings: [
    { type: Schema.Types.ObjectId, ref: 'Rating', autopopulate: true }
  ],
}, { timestamps: true });

ProductSchema.plugin(autopop)

export default model('Product', ProductSchema);