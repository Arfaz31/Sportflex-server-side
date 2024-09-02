import { z } from 'zod';

const shippingOrderValidationSchema = z.object({
  productId: z.string(),
  // image: z.array(z.string()).min(1, 'At least one image is required'),
  // price: z.number().min(0, 'Price must be a positive number'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const nameValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

const orderValidationSchema = z.object({
  body: z.object({
    name: nameValidationSchema,
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),
    phone: z.string().min(1, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    totalPrice: z.number().min(0, 'Total price must be a positive number'),
    order: z
      .array(shippingOrderValidationSchema)
      .min(1, 'At least one order item is required'),
    notes: z.string().optional(),
  }),
});

export default orderValidationSchema;
