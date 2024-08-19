import { model, Schema } from 'mongoose';
import { TCatagory } from './catagory.interface';

const catagorySchema = new Schema<TCatagory>({
  catagoryName: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

export const Catagory = model<TCatagory>('Catagory', catagorySchema);
