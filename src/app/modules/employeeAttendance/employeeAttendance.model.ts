import { model, Schema } from 'mongoose';
import {
  IEmployeeAttendance,
  IEmployeeAttendanceModel,
} from './employeeAttendance.interface';
import { ENUM_ATTENDANCE_STATUS } from '../../enums/employeeAttendanceEnum';
import { DateTimeHelpers } from '../../../helpers/DateTimeHelpers';

const employeeAttendanceSchema = new Schema<
  IEmployeeAttendance,
  Record<string, unknown>
>(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    checkInTime: {
      type: String,
      required: true,
    },
    checkOutTime: {
      type: String,
    },
    checkInLocation: {
      type: String,
      required: true,
    },
    checkOutLocation: {
      type: String,
    },
    device: {
      type: String,
      required: true,
    },
    browser: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(ENUM_ATTENDANCE_STATUS),
      required: true,
      default: ENUM_ATTENDANCE_STATUS.PRESENT,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

employeeAttendanceSchema.pre('save', async function (next) {
  this.checkInTime = DateTimeHelpers.getCurrentTime();
  next();
});

employeeAttendanceSchema.pre('find', async function (next) {
  this.populate('employeeId');
  next();
});

employeeAttendanceSchema.pre('findOne', async function (next) {
  this.populate('employeeId');
  next();
});

export const EmployeeAttendance = model<
  IEmployeeAttendance,
  IEmployeeAttendanceModel
>('EmployeeAttendance', employeeAttendanceSchema);
