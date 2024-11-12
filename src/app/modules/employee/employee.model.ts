import { model, Schema } from 'mongoose';
import {
  IEmployeeModel,
  IEmployee,
  IEmployeeMethods,
} from './employee.interface';
import bcrypt from 'bcrypt';
import { config } from '../../../config';

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
    },
    photo: {
      type: String,
    },
    address: {
      type: String,
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
    },
    refereshToken: {
      type: String,
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

employeeSchema.methods.isPasswordMatch = async function (
  givenPass: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPass, savePassword);
};

employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password.trim(),
    Number(config.bcrypt.salt)
  );
  next();
});

export const Employee = model<IEmployee, IEmployeeModel>(
  'Employee',
  employeeSchema
);
