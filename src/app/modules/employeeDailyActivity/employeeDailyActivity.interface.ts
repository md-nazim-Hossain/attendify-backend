import { Model, Schema } from 'mongoose';
import { IEmployee } from '../employee/employee.interface';
import { ENUM_ACTIVITY_STATUS } from '../../enums/employeeDailyActivity.enum';

export interface IEmployeeDailyActivity {
  _id: Schema.Types.ObjectId;
  employeeId: Schema.Types.ObjectId | IEmployee;
  activities: string;
  reason?: string;
  status: ENUM_ACTIVITY_STATUS;
}

export type IEmployeeDailyActivityModel = Model<
  IEmployeeDailyActivity,
  Record<string, unknown>
>;
