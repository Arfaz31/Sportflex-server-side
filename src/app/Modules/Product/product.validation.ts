import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    productName: z.string().min(1, 'Product name is required'),
    image: z.array(z.string().url(), {
      required_error: 'Product images are required',
    }),
    category: z.string(),
    price: z.number().min(1, 'Product price is required'),
    brand: z.string().min(1, 'Product brand is required'),
    description: z.string().min(1, 'Product description is required'),
    size: z.array(z.string()).optional(),
    color: z.array(z.string()).optional(),
    discount: z.number().optional(),
    discountEndingTime: z.string().optional(),
    stockQuantity: z
      .number()
      .min(1, 'Stock quantity must be a positive number'),
    availability: z.boolean(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    productName: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    size: z.array(z.string()).optional(),
    discount: z.number().optional(),
    stockQuantity: z.number().optional(),
    availability: z.boolean().optional(),
  }),
});

export const productValidationSchema = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
