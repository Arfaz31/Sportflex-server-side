import { Router } from 'express';
import validateRequest from '../../Middleware/validateRequest';
import { productValidationSchema } from './product.validation';
import { productController } from './product.controller';

const router = Router();

router.post(
  '/create-product',
  validateRequest(productValidationSchema.createProductValidationSchema),
  productController.createProduct,
);

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getSingleProduct);

export const productRoutes = router;
