import { Model, Schema } from 'mongoose';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';
import { ICompany } from '../company/company.interface';

export interface IEmployee {
  _id: Schema.Types.ObjectId | string;
  employeeId: string;
  fullName: string;
  companies: Array<Schema.Types.ObjectId | ICompany>;
  activeCompany?: Schema.Types.ObjectId | ICompany;
  email: string;
  phone?: string;
  address?: string;
  designation: string;
  photo?: string;
  password: string;
  passwordChangeAt?: string | Date;
  role: ENUM_EMPLOYEE_ROLE;
  status: boolean;
  creaedAt: string;
  updatedAt: string;
}

export interface IEmployeeFilters {
  searchTerm?: string;
  role?: ENUM_EMPLOYEE_ROLE;
  status?: boolean;
  employeeId?: string;
  email?: string;
  phone?: string;
  company?: string;
}

export interface IEmployeeMethods {
  isPasswordMatch: (
    givenPassword: string,
    hashedPassword: string
  ) => Promise<boolean>;
  isEmployeeExist: (
    employeeId: string
  ) => Promise<Pick<
    IEmployee,
    'employeeId' | 'password' | 'status' | 'role' | '_id'
  > | null>;
  generateRefreshToken: () => string;
  generateAccessToken: () => string;
}

export type IEmployeeModel = Model<
  IEmployee,
  Record<string, unknown>,
  IEmployeeMethods
>;
