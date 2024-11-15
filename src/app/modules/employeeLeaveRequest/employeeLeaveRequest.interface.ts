import { Model, Schema } from 'mongoose';
import { IEmployee } from '../employee/employee.interface';
import {
  ENUM_LEAVE_STATUS,
  ENUM_LEAVE_TYPE,
} from '../../enums/employeeLeaveRequest.enum';

export interface IEmployeeLeaveRequest {
  _id: Schema.Types.ObjectId;
  employeeId: Schema.Types.ObjectId | IEmployee;
  startDate: string;
  endDate: string;
  reason: string;
  reviewer?: Schema.Types.ObjectId | IEmployee;
  leaveType: ENUM_LEAVE_TYPE;
  status: ENUM_LEAVE_STATUS;
  createdAt: string;
  updatedAt: string;
}

export type IEmployeeLeaveRequestModel = Model<
  IEmployeeLeaveRequest,
  Record<string, unknown>
>;
