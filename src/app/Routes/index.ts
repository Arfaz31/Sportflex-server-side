import { Router } from 'express';
import { productRoutes } from '../Modules/Product/product.route';
import { catagoryRoutes } from '../Modules/Catagory/catagory.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/product',
    route: productRoutes,
  },
  {
    path: '/catagory',
    route: catagoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
