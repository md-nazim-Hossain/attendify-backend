import { Model, Schema } from 'mongoose';
import { IEmployee } from '../employee/employee.interface';
import { ENUM_ATTENDANCE_STATUS } from '../../enums/employeeAttendanceEnum';

export interface IEmployeeAttendance {
  _id: string;
  employeeId: Schema.Types.ObjectId | IEmployee;
  checkInTime: string;
  checkOutTime?: string;
  checkInLocation: string;
  checkOutLocation?: string;
  device: string;
  browser: string;
  ip?: string;
  status: ENUM_ATTENDANCE_STATUS;
  createdAt: string;
  updatedAt: string;
}

export interface IEmployeeAttendanceFilters {
  searchTerm?: string;
  status?: ENUM_ATTENDANCE_STATUS;
  employeeId?: string;
  checkInLocation?: string;
  checkOutLocation?: string;
  checkInTime?: string;
  checkOutTime?: string;
  device?: string;
  browser?: string;
}

export type IEmployeeAttendanceModel = Model<
  IEmployeeAttendance,
  Record<string, unknown>
>;
