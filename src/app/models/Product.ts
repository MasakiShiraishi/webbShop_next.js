import mongoose, { Schema } from 'mongoose';
import { Product } from '../lib/definitions';

const productSchema: Schema = new mongoose.Schema<Product>({
  _id: String,
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

export const ProductModel =
  mongoose.models.Product ||
  mongoose.model('Product', productSchema, 'products');
