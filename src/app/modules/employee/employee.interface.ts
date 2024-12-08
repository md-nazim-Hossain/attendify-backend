import { Model, Schema } from 'mongoose';
import {
  ENUM_EMPLOYEE_GENDER,
  ENUM_EMPLOYEE_ROLE,
  ENUM_EMPLOYEE_STATUS,
} from '../../enums/employee.enum';
import { IUser } from '../user/user.interface';

export interface IEmployee {
  _id: Schema.Types.ObjectId | string;
  employeeId: string;
  fullName?: string;
  user: Schema.Types.ObjectId | IUser;
  company: Schema.Types.ObjectId | string;
  employeeEmail: string;
  phone?: string;
  address?: string;
  designation: string;
  role: ENUM_EMPLOYEE_ROLE;
  status: ENUM_EMPLOYEE_STATUS;
  photo?: string;
  gender?: ENUM_EMPLOYEE_GENDER;
  dob?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeFilters {
  searchTerm?: string;
  role?: ENUM_EMPLOYEE_ROLE;
  status?: ENUM_EMPLOYEE_STATUS;
  employeeId?: string;
  employeeEmail?: string;
  phone?: string;
  user?: string;
  company?: string;
  fullName?: string;
}

export type IEmployeeModel = Model<IEmployee, Record<string, unknown>>;
