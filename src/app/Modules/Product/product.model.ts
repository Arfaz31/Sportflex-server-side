import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
import { Catagory } from '../Catagory/catagory.model';

const productSchema = new Schema<TProduct>(
  {
    productName: { type: String, required: [true, 'Product name is required'] },
    image: { type: [String], required: [true, 'Product image is required'] },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product category is required'],
      unique: true,
      ref: Catagory,
    },
    price: { type: Number, required: [true, 'Product price is required'] },
    brand: { type: String, required: [true, 'Product brand is required'] },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    size: {
      type: [String],
      default: undefined,
    },
    color: {
      type: [String],
      default: undefined,
    },
    discount: { type: Number, default: undefined },
    discountEndingTime: { type: String, default: undefined },
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
    },
    availability: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Product = model<TProduct>('Product', productSchema);
