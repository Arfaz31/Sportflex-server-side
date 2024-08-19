import { Catagory } from '../Catagory/catagory.model';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const categoryFind = await Catagory.findOne({
    catagoryName: payload.category,
  });
  if (!categoryFind) {
    throw new Error('Category not found');
  }

  // Create product with the category ObjectId
  const productData = {
    ...payload,
    category: categoryFind._id,
  };

  const newProduct = await Product.create(productData);
  return newProduct;
};

const getAllProductFromDB = async () => {
  const result = await Product.find().populate('category');
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate('category');
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
