import { model, Schema } from 'mongoose';
import { TName, TOrder, TShippingOrder } from './Order.interface';
import { Product } from '../Product/product.model';

const orderDetailSchema = new Schema<TShippingOrder>({
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Product is required'],
    unique: true,
    ref: Product,
  },
  quantity: {
    type: Number,
    required: true,
  },

  // productName: {
  //   type: String,
  //   required: true,
  // },
  // image: {
  //   type: [String],
  //   required: true,
  // },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  // quantity: {
  //   type: Number,
  //   required: true,
  // },
});

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const orderShema = new Schema<TOrder>({
  name: { type: nameSchema, required: true },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  order: {
    type: [orderDetailSchema],
    required: true,
  },
  notes: { type: String },
});

export const Order = model<TOrder>('Order', orderShema);
