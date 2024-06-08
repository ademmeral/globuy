import { model, Schema } from 'mongoose';
import { schema } from '../utils/utils.mjs';
import autopop from 'mongoose-autopopulate'

const RatingSchema = new Schema({
  product : {
    type : Schema.Types.ObjectId,
    ref : 'Product',
    required : schema.required('Product ID'),
    autopopulate : true,
  },
  userId : {
    type : String,
    required : schema.required('User ID')
  },
  star : {
    type : Number,
    required : schema.required('At least a star'),
    min : schema.min(1, 'Given star'),
    max : schema.min(5, 'Given star')
  }
}, { timestamps: true })

RatingSchema.plugin(autopop);
export default model('Rating', RatingSchema);