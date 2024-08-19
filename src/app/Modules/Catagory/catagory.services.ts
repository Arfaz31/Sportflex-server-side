import { TCatagory } from './catagory.interface';
import { Catagory } from './catagory.model';

const createCatagoryIntoDB = async (payload: TCatagory) => {
  const catagory = await Catagory.findOne({
    catagoryName: payload.catagoryName,
  });

  const slug = await Catagory.findOne({
    slug: payload.slug,
  });
  if (catagory) {
    throw new Error(`The name of this ${catagory} has already existed`);
  }
  if (slug) {
    throw new Error(`The name of this ${slug} has already existed`);
  }

  const newCatagory = await Catagory.create(payload);
  return newCatagory;
};

const getAllCatagoriesFromDB = async () => {
  const result = await Catagory.find();
  return result;
};
export const catagoryServices = {
  createCatagoryIntoDB,
  getAllCatagoriesFromDB,
};
