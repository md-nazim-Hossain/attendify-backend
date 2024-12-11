import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CompanyDetailsService } from './companyDetails.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const addCompnayDetails = catchAsync(async (req: Request, res: Response) => {
  const { ...companyData } = req.body;
  const companyId = req?.user?.companyId;
  await CompanyDetailsService.addCompnayDetails(companyData, companyId);
  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Company details added successfully',
  });
});

export const CompanyDetailsController = {
  addCompnayDetails,
};
