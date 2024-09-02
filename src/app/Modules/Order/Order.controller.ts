import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { OrderServices } from './Order.services';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Your order is created successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
};
