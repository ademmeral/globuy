import { Schema, model } from "mongoose";
import autopop from 'mongoose-autopopulate';
import { schema } from '../utils/utils.mjs';

const UserSchema = Schema({
  firstname: {
    type: String,
    required : schema.required('Firstname'),
    trim: true,
  },
  lastname: {
    type: String,
    required : schema.required('Lastname'),
    trim: true,
  },
  username: {
    type: String,
    required : schema.required('Username'),
    required : schema.unique('Username'),
    trim: true,
  },
  email: {
    type: {
      name: {
        type: String,
        required : schema.required('Email name'),
        trim: true,

      },
      domain: {
        type: String,
        required : schema.required('Email domain'),
        trim: true,

      },
    },
  },
  password: {
    type: String,
    required : schema.required('Password'),
    trim: true,

  },
  photo: Object,
  address: {
    type: String,
    default: '',
    trim: true,
  },
  phone: {
    type: {
      areaCode: Number,
      number: Number
    },
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  favorites: {
    type : [
      {
        type: Schema.Types.ObjectId,
        ref: 'Favorite',
        autopopulate: true
      }
    ],
    default : []
  }
}, { timestamps: true });

UserSchema.plugin(autopop);

UserSchema.virtual('email[domain]').get(() => this.email.split('@')[1])
UserSchema.virtual('email[name]').get(() => this.email.split('@')[0])

export default model('User', UserSchema);