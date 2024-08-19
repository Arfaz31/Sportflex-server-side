import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { catagoryServices } from './catagory.services';

const createCatagory = catchAsync(async (req, res) => {
  const result = await catagoryServices.createCatagoryIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Catagory is created successfully',
    data: result,
  });
});

const getAllCatagories = catchAsync(async (req, res) => {
  const result = await catagoryServices.getAllCatagoriesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Catagories retrieved successfully',
    data: result,
  });
});

export const catagoryController = {
  createCatagory,
  getAllCatagories,
};
