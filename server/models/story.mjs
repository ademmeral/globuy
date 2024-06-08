import { model, Schema } from 'mongoose'
import autopop from 'mongoose-autopopulate'
import { schema } from '../utils/utils.mjs';

const StorySchema = new Schema({
  media : [Object],
  user : {
    type : Schema.Types.ObjectId,
    ref: 'User',
    required : schema.required('User ID'),
    autopopulate: true
  },
  product : {
    type : Schema.Types.ObjectId,
    ref : 'Product',
    required : schema.required('Product ID'),
    autopopulate: true
  },
  likes : {
    type: Number,
    default: 0
  },
  views : {
    type: Number,
    default: 0,
  }
})

StorySchema.plugin(autopop);

export default model('Story', StorySchema)