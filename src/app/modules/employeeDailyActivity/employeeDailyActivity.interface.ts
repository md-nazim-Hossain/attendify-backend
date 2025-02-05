import { Model, Schema } from 'mongoose';
import { IEmployee } from '../employee/employee.interface';
import { ENUM_ACTIVITY_STATUS } from '../../enums/employeeDailyActivity.enum';

export interface IEmployeeDailyActivity {
  _id: Schema.Types.ObjectId;
  employee: Schema.Types.ObjectId | IEmployee;
  activities: string;
  reason?: string;
  status: ENUM_ACTIVITY_STATUS;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeDailyActivityFilters {
  searchTerm?: string;
  status?: ENUM_ACTIVITY_STATUS;
  employee?: string;
}

export type IEmployeeDailyActivityModel = Model<
  IEmployeeDailyActivity,
  Record<string, unknown>
>;
