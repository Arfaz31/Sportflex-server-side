import { Types } from 'mongoose';

export type TProduct = {
  productName: string;
  image: string[];
  category: Types.ObjectId;
  price: number;
  brand: string;
  description: string;
  size?: string[];
  color?: string[];
  discount?: number;
  discountEndingTime?: string;
  stockQuantity: number;
  availability: boolean;
};
