import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import {
  IEmployeeAttendance,
  IEmployeeAttendanceFilters,
} from './employeeAttendance.interface';
import { EmployeeAttendance } from './employeeAttendance.model';
import { DateTimeHelpers } from '../../../helpers/DateTimeHelpers';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/common';
import { EmployeeAttendanceConstant } from './employeeAttendance.constant';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import mongoose, { SortOrder } from 'mongoose';
import { ENUM_ATTENDANCE_STATUS } from '../../enums/employeeAttendanceEnum';
import { CompanyDetails } from '../CompanyDetails/companyDetails.model';

const employeeCheckIn = async (
  payload: IEmployeeAttendance,
  companyId: string
): Promise<void> => {
  const officeTime = await CompanyDetails.findOne({
    company: new mongoose.Types.ObjectId(companyId),
  });

  if (!officeTime) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Office time not found');
  }

  const { endOfDay, startOfDay } = DateTimeHelpers.getTodayRange();
  const attendance = await EmployeeAttendance.findOne({
    $and: [
      {
        employee: new mongoose.Types.ObjectId(payload.employee as string),
      },
      {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    ],
  });

  if (attendance) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Attendance already exist');
  }

  const status = DateTimeHelpers.getAttendanceStatus(
    officeTime.officeStartTime,
    officeTime.officeEndTime
  );

  await EmployeeAttendance.create({
    ...payload,
    status,
  });
};

const employeeCheckOut = async (
  payload: string,
  employeeId: string
): Promise<void> => {
  const { endOfDay, startOfDay } = DateTimeHelpers.getTodayRange();
  const attendance = await EmployeeAttendance.findOne({
    $and: [
      { employee: new mongoose.Types.ObjectId(employeeId) },
      {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    ],
  });

  if (!attendance) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Attendance not found');
  }
  if (!attendance.checkInTime) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Attendance not checked in yet'
    );
  }
  if (attendance.checkOutTime) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Attendance already checked out'
    );
  }
  attendance.checkOutTime = DateTimeHelpers.getCurrentTime();
  attendance.checkOutLocation = payload;
  await attendance.save({ validateBeforeSave: false });
};

const getCheckTodayIsAttendance = async (
  employeeId: string
): Promise<IEmployeeAttendance | null> => {
  const { endOfDay, startOfDay } = DateTimeHelpers.getTodayRange();
  return await EmployeeAttendance.findOne({
    $and: [
      { employee: new mongoose.Types.ObjectId(employeeId) },
      {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    ],
  });
};

const getAllMyAttendances = async (
  employeeId: string
): Promise<IEmployeeAttendance[]> => {
  const employeeAttendance = await EmployeeAttendance.find({
    employee: new mongoose.Types.ObjectId(employeeId),
  });
  return employeeAttendance;
};

const getAllAttendances = async (
  filters: IEmployeeAttendanceFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployeeAttendance[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: EmployeeAttendanceConstant.employeeAttendanceSearchFields.map(
        (field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })
      ),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await EmployeeAttendance.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await EmployeeAttendance.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAllAttendancesByEmployeeId = async (
  employeeId: string,
  filters: IEmployeeAttendanceFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployeeAttendance[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (employeeId) {
    andConditions.push({
      employee: new mongoose.Types.ObjectId(employeeId),
    });
  }

  if (searchTerm) {
    andConditions.push({
      $or: EmployeeAttendanceConstant.employeeAttendanceSearchFields.map(
        (field) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })
      ),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await EmployeeAttendance.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await EmployeeAttendance.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAttendanceById = async (
  id: string
): Promise<IEmployeeAttendance | null> => {
  const employeeAttendance = await EmployeeAttendance.findById(id);
  return employeeAttendance;
};

const updateAttendanceStatus = async (
  id: string,
  status: ENUM_ATTENDANCE_STATUS
): Promise<void> => {
  const employeeAttendance = await EmployeeAttendance.findById(id);
  if (!employeeAttendance) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Attendance not found');
  }
  employeeAttendance.status = status;
  await employeeAttendance.save();
};

export const EmployeeAttendanceService = {
  employeeCheckIn,
  employeeCheckOut,
  getAllMyAttendances,
  getAllAttendances,
  getAttendanceById,
  updateAttendanceStatus,
  getAllAttendancesByEmployeeId,
  getCheckTodayIsAttendance,
};
