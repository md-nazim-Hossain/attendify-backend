import { model, Schema } from 'mongoose';
import {
  IEmployeeModel,
  IEmployee,
  IEmployeeMethods,
} from './employee.interface';
import bcrypt from 'bcrypt';
import { config } from '../../../config';
import {
  ENUM_EMPLOYEE_GENDER,
  ENUM_EMPLOYEE_ROLE,
} from '../../enums/employee.enum';
import jwt, { Secret } from 'jsonwebtoken';

const employeeSchema = new Schema<
  IEmployee,
  Record<string, unknown>,
  IEmployeeMethods
>(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    photo: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: Object.values(ENUM_EMPLOYEE_GENDER),
    },
    designation: {
      type: String,
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(ENUM_EMPLOYEE_ROLE),
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

employeeSchema.methods.isEmployeeExist = async function (
  employeeId: string
): Promise<Pick<
  IEmployee,
  'employeeId' | 'password' | 'status' | 'role' | '_id'
> | null> {
  const employee = await Employee.findOne(
    { employeeId },
    { status: 1, _id: 1, password: 1, role: 1, employeeId: 1 }
  ).lean();

  return employee as IEmployee;
};

employeeSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword.trim(), hashedPassword);
};

employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password.trim(),
    Number(config.bcrypt.salt)
  );
  next();
});

employeeSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      employeeId: this.employeeId,
      email: this.email,
      fullName: this.fullName,
      role: this.role,
    },
    config.jwt.access_token_secret as Secret,
    {
      expiresIn: config.jwt.access_token_expiry,
    }
  );
};

employeeSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      employeeId: this.employeeId,
      role: this.role,
    },
    config.jwt.refresh_token_secret as Secret,
    {
      expiresIn: config.jwt.refresh_token_expiry,
    }
  );
};

export const Employee = model<IEmployee, IEmployeeModel>(
  'Employee',
  employeeSchema
);
