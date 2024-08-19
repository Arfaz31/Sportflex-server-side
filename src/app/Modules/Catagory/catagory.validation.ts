import { z } from 'zod';

const catagoryValidationSchema = z.object({
  body: z.object({
    catagoryName: z.string().min(1, { message: 'Category name is required' }),
    image: z.string().min(1, { message: 'Image URL is required' }),
    slug: z.string().min(1, { message: 'Slug is required' }),
  }),
});

export default catagoryValidationSchema;
