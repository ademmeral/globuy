import { model, Schema } from 'mongoose';
import autopop from 'mongoose-autopopulate'
import { schema } from '../utils/utils.mjs';

const FavoritesSchema = new Schema({
  product:
  {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    autopopulate: true
  },
  userId: {
    type: String,
    required: schema.required('User ID'),
  }
}, { timestamps: true });

FavoritesSchema.plugin(autopop);

export default model('Favorite', FavoritesSchema)