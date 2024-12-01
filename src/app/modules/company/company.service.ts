import { ICompany } from './company.interface';
import { Company } from './company.model';

const createCompany = async (payload: ICompany): Promise<ICompany> => {
  const result = await Company.create(payload);
  return result;
};
