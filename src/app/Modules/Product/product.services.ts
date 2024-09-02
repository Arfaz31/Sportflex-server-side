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
  let limit: number = Number(query?.limit || 15);
  let skip: number = 0;
  if (query?.page) {
    const page: number = Number(query?.page || 1);
    skip = Number((page - 1) * limit);
  }

  const skipQuery = searchQuery.skip(skip);
  const limitQuery = skipQuery.limit(limit);

  // Sorting
  let sortBy = '-createdAt'; // Default sort by latest
  if (query?.sortBy === 'price-low-high') {
    sortBy = 'price'; // Ascending order
  } else if (query?.sortBy === 'price-high-low') {
    sortBy = '-price'; // Descending order
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

  // Availability Filter
  let availabilityQuery = {};
  if (query?.availability !== undefined) {
    availabilityQuery = { availability: query.availability === 'true' };
  }

  // Price Range Filter
  let priceRangeQuery = {};
  if (query.minPrice || query.maxPrice) {
    const minPrice = Number(query.minPrice) || 0;
    const maxPrice = Number(query.maxPrice) || Infinity;
    priceRangeQuery = { price: { $gte: minPrice, $lte: maxPrice } };
  }

  // Brand Filter
  let brandQuery = {};
  if (query?.brand) {
    brandQuery = { brand: query.brand };
  }

  //exact match filtering
  const excludeFileds = [
    'searchTerm',
    'sortBy',
    'limit',
    'page',
    'fields',
    'categoryId',
    'availability',
    'minPrice',
    'maxPrice',
    'brand',
  ];
  excludeFileds.forEach((el) => delete queryObject[el]);

  const combinedQuery = {
    ...queryObject,
    ...categoryQuery,
    ...availabilityQuery,
    ...priceRangeQuery,
    ...brandQuery,
  };

  const products = await fieldQuery.find(combinedQuery).populate('category');

  // Count total documents for pagination
  const totalProducts = await Product.countDocuments(combinedQuery);

  return {
    products,
    totalPages: Math.ceil(totalProducts / limit),
  };
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

const getFlashDealProductFromDB = async () => {
  const flashProducts = await Product.find({
    discountEndingTime: { $exists: true, $ne: '' },
  });
  return flashProducts;
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  getCategoryRelatedProductsFromDB,
  getFlashDealProductFromDB,
};
