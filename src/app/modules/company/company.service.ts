import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Employee } from '../employee/employee.model';
import { ICompany } from './company.interface';
import { Company } from './company.model';
import mongoose from 'mongoose';

const createCompany = async (payload: ICompany): Promise<void> => {
  // check if company exist
  const isCompanyExist = await Company.findOne({ domani: payload.domain });
  if (isCompanyExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Company already exist');
  }
  await Company.create(payload);
};

const getAllMyCompanies = async (userId: string): Promise<ICompany[]> => {
  const companies = await Employee.aggregate([
    {
      $match: {
        $and: [
          { status: 'active' },
          { user: new mongoose.Types.ObjectId(userId) },
        ],
      },
    },
    {
      $lookup: {
        from: 'companies',
        localField: 'company',
        foreignField: '_id',
        as: 'company',
        pipeline: [
          {
            $project: {
              name: 1,
              logo: 1,
              domain: 1,
              address: 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        company: 1,
      },
    },
  ]);

  if (
    !companies.length ||
    !(companies[0] as unknown as { company: ICompany[] })?.company?.length
  ) {
    return [];
  }
  return (companies[0] as unknown as { company: ICompany[] }).company;
};

export const getMyCompanies = async (
  employeeId: string
): Promise<ICompany[]> => {
  const companies = await Company.find({ owner: employeeId }).populate(
    'owner',
    'name email status'
  );
  return companies;
};

export const CompanyService = {
  createCompany,
  getAllMyCompanies,
  getMyCompanies,
};
