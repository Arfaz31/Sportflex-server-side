import mongoose from 'mongoose';
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

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };

  const poductSearchAbleFields = [
    'productName',
    'category.catagoryName',
    'brand',
  ];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Product.find({
    $or: poductSearchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  //pagination
  // eslint-disable-next-line prefer-const
  let limit: number = Number(query?.limit || 12);
  let skip: number = 0;
  if (query?.page) {
    const page: number = Number(query?.page || 1);
    skip = Number((page - 1) * limit);
  }

  const skipQuery = searchQuery.skip(skip);
  const limitQuery = skipQuery.limit(limit);

  //sorting
  let sortBy = '-createdAt';
  if (query?.sortBy) {
    sortBy = query?.sortBy as string;
  }
  const sortQuery = limitQuery.sort(sortBy);

  // field filtering
  let fields = ' ';

  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ');
  }

  const fieldQuery = sortQuery.select(fields);

  // Filter by category if categoryId is provided
  // eslint-disable-next-line prefer-const
  let categoryQuery: { category?: mongoose.Types.ObjectId } = {};
  if (query?.categoryId) {
    categoryQuery.category = new mongoose.Types.ObjectId(
      query.categoryId as string,
    );
  }

  //exact match filtering
  const excludeFileds = [
    'searchTerm',
    'sortBy',
    'limit',
    'page',
    'fields',
    'categoryId',
  ];
  excludeFileds.forEach((el) => delete queryObject[el]);

  const combinedQuery = { ...queryObject, ...categoryQuery };

  const filterQuery = await fieldQuery.find(combinedQuery).populate('category');

  return filterQuery;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate('category');
  return result;
};

const getCategoryRelatedProductsFromDB = async (excludeProductId: string) => {
  const product = await Product.findById(excludeProductId);

  if (!product) {
    throw new Error('product not found');
  }

  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: excludeProductId },
  }).populate('category');
  // Find all products with the same category ID, except for the product with this specific ID.
  return relatedProducts;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  getCategoryRelatedProductsFromDB,
};
