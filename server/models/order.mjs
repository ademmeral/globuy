import { model, Schema } from 'mongoose';
import { schema } from '../utils/utils.mjs';

export const OrderSchema = new Schema({
  customerId : {
    type: String,
    required: schema.required('Customer ID'),
    unique: schema.unique('Customer ID')
  },
  paymentId: {
    type: String,
    required: schema.required('Payment ID'),
    unique: schema.unique('Payment ID')
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: schema.required('Product ID'),
      unique: schema.unique('Product ID')
    },
    qty: {
      type: Number,
      required: schema.required('Quantity'),
      min: schema.min(1, 'Quantity'),
      default : 1
    }
  }],
  customerDetails: {
    email : String,
    address: Object,
    fullname: String,
    phone: String,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending',
  },
  paymentStatus  : {
    type: String,
    enum: ['failed', 'pending', 'paid'],
    default : 'pending',
  },
  currency: {
    type: String,
    required: schema.required('Currency')
  },
}, { timestamps: true });

export default model('Order', OrderSchema);
