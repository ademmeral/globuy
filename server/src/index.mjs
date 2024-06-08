import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from '../config/mongoose.mjs';
import userRoute from '../routes/user.mjs';
import usersRoute from '../routes/users.mjs';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { CORS_OPTIONS } from '../config/cors.mjs';
import path from 'node:path';
import ctgsRoute from '../routes/categories.mjs';
import brandsRoute from '../routes/brands.mjs';
import productsRoute from '../routes/products.mjs';
import favoritesRoute from '../routes/favorites.mjs';
import ratingsRoute from '../routes/ratings.mjs';
import commentsRoute from '../routes/comments.mjs';
import ordersRoute from '../routes/orders.mjs';
import paymentsRoute from '../routes/payments.mjs';
import salesRoute from '../routes/sales.mjs';
import storiesRoute from '../routes/stories.mjs';
import mediaRoute from '../routes/media.mjs';

dotenv.config({ path: path.resolve('./.env') });
connectDB();

const app = express();
const port = process.env.PORT || 3001

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({
  extended: true,
  limit : 100_000,
  parameterLimit : 24
}));

app.use(fileUpload({
  limits: {
    fileSize: 5_000_000,    // 5mb
  },
  abortOnLimit: true,
  responseOnLimit : 'Too large file size, max 0.5mb 🥲',
  useTempFiles: true,
  tempFileDir : path.resolve(process.cwd(), 'temp'),
  parseNested : true,
  preserveExtension : true,
}));


// ROUTES
app.use('/users', usersRoute);
app.use('/user', userRoute);

app.use('/categories', ctgsRoute);
app.use('/brands', brandsRoute);
app.use('/products', productsRoute);
app.use('/favorites', favoritesRoute);
app.use('/ratings', ratingsRoute);
app.use('/comments', commentsRoute);
app.use('/orders', ordersRoute);
app.use('/payments', paymentsRoute);
app.use('/sales', salesRoute);
app.use('/stories', storiesRoute);
app.use('/media', mediaRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});