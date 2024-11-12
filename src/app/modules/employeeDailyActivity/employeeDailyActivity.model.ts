import { model, Schema } from 'mongoose';
import {
  IEmployeeDailyActivity,
  IEmployeeDailyActivityModel,
} from './employeeDailyActivity.interface';
import { ENUM_ACTIVITY_STATUS } from '../../enums/employeeDailyActivity.enum';

const employeeDailyActivitySchema = new Schema<
  IEmployeeDailyActivity,
  Record<string, unknown>
>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    activities: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      default: ENUM_ACTIVITY_STATUS.QUEUE,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const EmployeeDailyActivity = model<
  IEmployeeDailyActivity,
  IEmployeeDailyActivityModel
>('EmployeeDailyActivity', employeeDailyActivitySchema);
