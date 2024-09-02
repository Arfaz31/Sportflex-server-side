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
router.get('/flashdeals', productController.getFlashDealProducts);
router.get('/:id', productController.getSingleProduct);
router.get('/:id/related', productController.getCategoryRelatedProducts);

export const productRoutes = router;
