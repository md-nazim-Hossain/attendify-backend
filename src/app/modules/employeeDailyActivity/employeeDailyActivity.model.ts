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
      enum: Object.values(ENUM_ACTIVITY_STATUS),
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

employeeDailyActivitySchema.pre('findOne', async function (next) {
  this.populate('employeeId');
  next();
});

employeeDailyActivitySchema.pre('find', async function (next) {
  this.populate('employeeId');
  next();
});

export const EmployeeDailyActivity = model<
  IEmployeeDailyActivity,
  IEmployeeDailyActivityModel
>('EmployeeDailyActivity', employeeDailyActivitySchema);
