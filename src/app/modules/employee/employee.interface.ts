import { Model, Schema } from 'mongoose';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';

export interface IEmployee {
  _id: Schema.Types.ObjectId;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  designation: string;
  team?: Schema.Types.ObjectId | object;
  photo?: string;
  password: string;
  passwordChangeAt?: string | Date;
  role: ENUM_EMPLOYEE_ROLE;
  refereshToken?: string;
  status: boolean;
}

export interface IEmployeeMethods {
  isPasswordMatch: (
    givenPass: string,
    savePassword: string
  ) => Promise<boolean>;
  isEmployeeExist: (
    id: string
  ) => Promise<Pick<
    IEmployee,
    'employeeId' | 'password' | 'status' | 'role'
  > | null>;
}
export type IEmployeeModel = Model<
  IEmployee,
  Record<string, unknown>,
  IEmployeeMethods
>;
