import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { productServices } from './product.services';

const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product is added successfully',
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `The product of this ${id} is retrieved successfully`,
    data: result,
  });
});

const getCategoryRelatedProducts = catchAsync(async (req, res) => {
  const { id } = req.params;
  // Fetch related products
  const relatedProducts =
    await productServices.getCategoryRelatedProductsFromDB(id);
  // the id (which is the ID of the product itself).

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Related products retrieved successfully',
    data: relatedProducts,
  });
});

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  getCategoryRelatedProducts,
};
