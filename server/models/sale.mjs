import { model, Schema } from 'mongoose'
import { schema } from '../utils/utils.mjs'
import autopop from 'mongoose-autopopulate';

export const SalesSchema = new Schema({
  userId : {
    type : String,
    required : schema.required('User ID'),
  },
  product : {
    type: Schema.Types.ObjectId,
    ref : 'Product',
    required : schema.required('Product ID'),
    autopopulate: true
  },
});

SalesSchema.plugin(autopop)
export default model('Sale', SalesSchema);