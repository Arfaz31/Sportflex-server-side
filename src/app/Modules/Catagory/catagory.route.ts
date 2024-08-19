import { Router } from 'express';
import validateRequest from '../../Middleware/validateRequest';
import catagoryValidationSchema from './catagory.validation';
import { catagoryController } from './catagory.controller';

const router = Router();

router.post(
  '/create-catagory',
  validateRequest(catagoryValidationSchema),
  catagoryController.createCatagory,
);
router.get('/', catagoryController.getAllCatagories);

export const catagoryRoutes = router;
