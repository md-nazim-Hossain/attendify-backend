import { Model, Schema } from 'mongoose';
import {
  ENUM_COMPANY_SIZE,
  ENUM_COMPANY_TYPE,
} from '../../enums/companyDetails.enum';
import { ICompany } from '../company/company.interface';

export interface ICompanyDetails {
  _id: string | Schema.Types.ObjectId;
  email: string;
  phone?: string;
  address: string;
  website?: string;
  logo?: string;
  type?: ENUM_COMPANY_TYPE;
  createdAt: string;
  updatedAt: string;
  description?: string;
  totalEmployees?: number;
  size?: ENUM_COMPANY_SIZE;
  regNumber?: string;
  officeStartTime: string;
  officeEndTime: string;
  company: Schema.Types.ObjectId | ICompany;
}

export type ICompanyDetailsModel = Model<
  ICompanyDetails,
  Record<string, unknown>
>;
