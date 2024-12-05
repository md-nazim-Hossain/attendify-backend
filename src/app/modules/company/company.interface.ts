import { Model, Schema } from 'mongoose';
import {
  ENUM_COMPANY_SIZE,
  ENUM_COMPANY_STATUS,
  ENUM_COMPANY_TYPE,
} from '../../enums/company.enum';
import { IUser } from '../user/user.interface';

export interface ICompany {
  _id: Schema.Types.ObjectId | string;
  name: string;
  email: string;
  owner: Schema.Types.ObjectId | IUser;
  phone?: string;
  address: string;
  logo?: string;
  website?: string;
  domain: string;
  type: ENUM_COMPANY_TYPE;
  status: ENUM_COMPANY_STATUS;
  verfiedAt?: Date;
  createdAt: string;
  updatedAt: string;
  description?: string;
  totalEmployees?: number;
  size: ENUM_COMPANY_SIZE;
  regNumber?: string;
}

export type ICompanyModel = Model<ICompany, Record<string, unknown>>;
