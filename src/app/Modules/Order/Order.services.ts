/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { Product } from '../Product/product.model';
import { TOrder } from './Order.interface';
import { Order } from './Order.model';

const createOrderIntoDB = async (payload: TOrder) => {
  // Start a new MongoDB session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Iterate over each order item
    for (const orderItem of payload.order) {
      const { productId, quantity } = orderItem;

      const product = await Product.findById(productId).session(session);

      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      // Check if the product stock is sufficient
      if (product.stockQuantity < quantity) {
        throw new Error(
          `Insufficient quantity available in inventory for product: ${product.productName}`,
        );
      }

      // Deduct the ordered quantity from the product stock
      product.stockQuantity -= quantity;

      // Update the product's availability based on the new stock quantity
      if (product.stockQuantity === 0) {
        product.availability = false;
      } else {
        product.availability = true;
      }

      // Save the updated product details within the session
      await product.save({ session });
    }

    // Create the order in the database within the session
    const result = await Order.create([payload], { session });

    // Commit the transaction if everything is successful
    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find().populate('order.productId');
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
