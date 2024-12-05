import { model, Schema } from 'mongoose';
import { IEmployeeModel, IEmployee } from './employee.interface';
import {
  ENUM_EMPLOYEE_ROLE,
  ENUM_EMPLOYEE_STATUS,
} from '../../enums/employee.enum';

const employeeSchema = new Schema<IEmployee, Record<string, unknown>>(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    employeeEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    designation: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(ENUM_EMPLOYEE_ROLE),
      default: ENUM_EMPLOYEE_ROLE.EMPLOYEE,
    },
    status: {
      type: String,
      enum: Object.values(ENUM_EMPLOYEE_STATUS),
      default: ENUM_EMPLOYEE_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Employee = model<IEmployee, IEmployeeModel>(
  'Employee',
  employeeSchema
);
