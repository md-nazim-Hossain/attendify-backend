import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CompanyService } from './company.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ICompany } from './company.interface';

const createCompany = catchAsync(async (req: Request, res: Response) => {
  const { ...companyData } = req.body;
  await CompanyService.createCompany({ ...companyData, owner: req.user._id });
  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Company created successfully',
  });
});

const getAllMyCompanies = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyService.getAllMyCompanies(req.user._id);
  sendResponse<ICompany[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Companies fetched successfully',
    data: result,
  });
});

const getMyCompanies = catchAsync(async (req: Request, res: Response) => {
  const result = await CompanyService.getMyCompanies(req.user._id);
  sendResponse<ICompany[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My companies fetched successfully',
    data: result,
  });
});

export const CompanyController = {
  createCompany,
  getAllMyCompanies,
  getMyCompanies,
};
