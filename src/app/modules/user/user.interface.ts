import { Model, Schema } from 'mongoose';
import { ENUM_USER_GENDER, ENUM_USER_STATUS } from '../../enums/user.enum';

export interface IUser {
  _id: string | Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  photo?: string;
  gender?: ENUM_USER_GENDER;
  dob?: string;
  passwordChangeAt?: string | Date;
  status: ENUM_USER_STATUS;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserMethods {
  isPasswordMatch: (
    givenPassword: string,
    hashedPassword: string
  ) => Promise<boolean>;
  isUserExist: (
    email: string
  ) => Promise<Pick<
    IUser,
    'name' | 'password' | 'status' | 'email' | '_id'
  > | null>;
  generateRefreshToken: () => string;
  generateAccessToken: (employee?: {
    role: string;
    companyId: string;
    employeeId: string;
    employeeObjectId?: string;
  }) => string;
}

export type IUserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
