import { model, Schema } from 'mongoose';
import {
  IEmployeeLeaveRequest,
  IEmployeeLeaveRequestModel,
} from './employeeLeaveRequest.interface';

const employeeLeaveRequestSchema = new Schema<
  IEmployeeLeaveRequest,
  Record<string, unknown>
>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    leaveType: {
      type: String,
      required: true,
      enum: Object.values('leaveType'),
    },
    status: {
      type: String,
      required: true,
      enum: Object.values('status'),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const EmployeeLeaveRequest = model<
  IEmployeeLeaveRequest,
  IEmployeeLeaveRequestModel
>('EmployeeLeaveRequest', employeeLeaveRequestSchema);
