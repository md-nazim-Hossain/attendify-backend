import { Model, Schema } from 'mongoose';
import { IEmployee } from '../employee/employee.interface';
import { ENUM_ACTIVITY_STATUS } from '../../enums/employeeDailyActivity.enum';

export interface IEmployeeDailyActivity {
  _id: Schema.Types.ObjectId;
  employeeId: Schema.Types.ObjectId | IEmployee;
  activities: string;
  reason?: string;
  status: ENUM_ACTIVITY_STATUS;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeDailyActivityFilters {
  searchTerm?: string;
  status?: ENUM_ACTIVITY_STATUS;
  employeeId?: string;
}

export type IEmployeeDailyActivityModel = Model<
  IEmployeeDailyActivity,
  Record<string, unknown>
>;
