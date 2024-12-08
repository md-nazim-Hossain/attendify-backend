import { Model, Schema } from 'mongoose';
import { ENUM_COMPANY_STATUS } from '../../enums/company.enum';
import { IUser } from '../user/user.interface';

export interface ICompany {
  _id: Schema.Types.ObjectId | string;
  name: string;
  domain: string;
  verfiedAt?: Date;
  owner: Schema.Types.ObjectId | IUser;
  status: ENUM_COMPANY_STATUS;
}

export type ICompanyModel = Model<ICompany, Record<string, unknown>>;
