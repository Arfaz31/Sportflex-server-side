import { Router } from 'express';
import validateRequest from '../../Middleware/validateRequest';
import orderValidationSchema from './Order.validation';
import { OrderController } from './Order.controller';

const router = Router();
router.post(
  '/create-order',
  validateRequest(orderValidationSchema),
  OrderController.createOrder,
);
router.get('/', OrderController.getAllOrder);

export const OrderRoutes = router;
