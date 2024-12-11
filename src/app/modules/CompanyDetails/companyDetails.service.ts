import mongoose from 'mongoose';
import { ICompanyDetails } from './companyDetails.interface';
import { CompanyDetails } from './companyDetails.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const addCompnayDetails = async (
  payload: ICompanyDetails,
  companyId: string
): Promise<void> => {
  // check if employee exist
  const isCompanyDetailsExist = await CompanyDetails.findOne({
    company: new mongoose.Types.ObjectId(companyId),
  });

  if (isCompanyDetailsExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Company details already exist');
  }
  await CompanyDetails.create({
    ...payload,
    company: new mongoose.Types.ObjectId(companyId),
  });
};

export const CompanyDetailsService = {
  addCompnayDetails,
};
