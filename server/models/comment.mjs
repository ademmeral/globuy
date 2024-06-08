import { model, Schema } from 'mongoose'
import autopop from 'mongoose-autopopulate';
import { schema } from '../utils/utils.mjs';

const CommentSchema = new Schema({
  productId : {
    type : String,
    required : true
  },
  user : {
    type : Schema.Types.ObjectId,
    ref: 'User',
    required : schema.required('User ID'),
    autopopulate: true
  },
  title : {
    type : String,
    required : schema.required('Title'),
  },
  content : {
    type : String,
    required : schema.required('Content'),
  },
}, { timestamps: true });

CommentSchema.plugin(autopop);
export default model('Comment', CommentSchema);