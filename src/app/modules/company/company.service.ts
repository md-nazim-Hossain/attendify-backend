import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Employee } from '../employee/employee.model';
import { ICompany } from './company.interface';
import { Company } from './company.model';

const createCompany = async (payload: ICompany): Promise<void> => {
  await Company.create(payload);
};

const getAllMyCompanies = async (employeeId: string): Promise<ICompany[]> => {
  const employee = await Employee.findOne({ employeeId })
    .populate('companies', { _id: 1, name: 1, logo: 1, domain: 1, website: 1 })
    .lean();

  return employee?.companies as ICompany[];
};

export const getMyCompany = async (employeeId: string): Promise<ICompany> => {
  const company = await Company.findOne({ owner: employeeId });
  if (!company) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Company not found');
  }
  return company;
};

export const CompanyService = {
  createCompany,
  getAllMyCompanies,
  getMyCompany,
};
