import { Model, Schema } from 'mongoose';
import { ENUM_BREAK_TYPE } from '../../enums/employeeDailyBreak.enum';
import { IEmployee } from '../employee/employee.interface';

export interface IEmployeeDailyBreak {
  _id: Schema.Types.ObjectId;
  employeeId: Schema.Types.ObjectId | IEmployee;
  startTime: string;
  endTime: string;
  reason: string;
  type: ENUM_BREAK_TYPE;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IEmployeeDailyBreakModel = Model<
  IEmployeeDailyBreak,
  Record<string, unknown>
>;
