import { model, Schema } from 'mongoose';
import { ENUM_BREAK_TYPE } from '../../enums/employeeDailyBreak.enum';
import {
  IEmployeeDailyBreak,
  IEmployeeDailyBreakModel,
} from './employeeDailyBreak.interface';

const employeeDailyBreakSchema = new Schema<IEmployeeDailyBreak>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return value > this.startTime;
        },
        message: 'End time must be greater than start time',
      },
    },
    reason: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(ENUM_BREAK_TYPE),
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

export const EmployeeDailyBreak = model<
  IEmployeeDailyBreak,
  IEmployeeDailyBreakModel
>('EmployeeDailyBreak', employeeDailyBreakSchema);
