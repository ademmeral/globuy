// models/payment.mjs

import { Schema, model } from 'mongoose';
import { schema } from '../utils/utils.mjs';
import autopop from 'mongoose-autopopulate'

export const PaymentSchema = new Schema({
  status : {
    type: String,
    enum : ['pending', 'failed', 'success'],
    required : schema.required('Payment status'),
    default : 'pending',
  },
  price : {
    type : Number,
    required : schema.required('Payment price')
  },
  priceByCurrency : {
    type : Number,
    required : schema.required('Price by currency')
  },
  tax: {
    type: Number,
    default: 0
  },
  shippingPrice: {
    type: Number,
    default: 0
  },
  order: {
    type : Schema.Types.ObjectId,
    ref : 'Order',
    required : schema.required('Order ID'),
    validate : {
      validator : v => schema.validator(v, 'Order ID')
    },
    autopopulate : true
  },
  transactionId : {
    type: String,
    required : schema.required('Transaction ID')
  },
  method: {
    type: String,
    enum: {
      values: ['paypal', 'google_pay', 'apple_pay', 'bank_transfer', 'card'],
      message : schema.enum('payment method')
    },
    required: schema.required('Payment method')
  },
  currency : {
    type: String,
    required : schema.required('Currency of payment'),
    default : 'USD',
    validate : {
      validator : v => schema.validator(/^[A-Z]{3}$/.test(v), 'Currency')
    }
  },
  qty: {
    type: Number,
    required: schema.required('Quantity'),
    min: schema.min(1, 'Quantity'),
  },
});

PaymentSchema.plugin(autopop);

export default model('Payment', PaymentSchema);


