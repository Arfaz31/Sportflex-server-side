// export type TShippingOrder = {
//   productName: string;
//   image: string[];
//   price: number;
//   quantity: number;

import { Types } from 'mongoose';

export type TShippingOrder = {
  productId: Types.ObjectId;
  quantity: number;
  selectedSize?: string;
};

export type TName = {
  firstName: string;
  lastName: string;
};

export type TOrder = {
  name: TName;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  order: TShippingOrder[];
  notes?: string;
};
