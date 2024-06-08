import { model, Schema } from 'mongoose';
import autopop from 'mongoose-autopopulate';
import { schema } from '../utils/utils.mjs';

export const OrderSchema = new Schema({
  userId : {
    type : String,
    required : schema.required('User ID')
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: schema.required('Product ID'),
    autopopulate: true
  },
  qty: {
    type: Number,
    required: schema.required('Quantity'),
    min: schema.min(1, 'Quantity'),
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending',
  },
  address: {
    type: String,
    required: schema.required('Payment address')
  }
}, { timestamps: true });

OrderSchema.plugin(autopop);

export default model('Order', OrderSchema);
