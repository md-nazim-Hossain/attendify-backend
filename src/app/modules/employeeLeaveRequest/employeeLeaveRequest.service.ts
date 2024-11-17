import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/common';
import { EmployeeLeaveRequestConstant } from './employeeLeaveRequest.constant';
import {
  IEmployeeLeaveRequest,
  IEmployeeLeaveRequestFilter,
} from './employeeLeaveRequest.interface';
import { EmployeeLeaveRequest } from './employeeLeaveRequest.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { ENUM_LEAVE_STATUS } from '../../enums/employeeLeaveRequest.enum';

const addLeaveRequest = async (
  payload: IEmployeeLeaveRequest
): Promise<void> => {
  await EmployeeLeaveRequest.create(payload);
};

const getAllLeaveRequests = async (
  filters: IEmployeeLeaveRequestFilter,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployeeLeaveRequest[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: EmployeeLeaveRequestConstant.employeeLeaveRequestSearchFields.map(
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

  const result = await EmployeeLeaveRequest.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await EmployeeLeaveRequest.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyLeaveRequests = async (
  employeeId: string,
  filters: IEmployeeLeaveRequestFilter,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployeeLeaveRequest[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (employeeId) {
    andConditions.push({
      employeeId,
    });
  }

  if (searchTerm) {
    andConditions.push({
      $or: EmployeeLeaveRequestConstant.employeeLeaveRequestSearchFields.map(
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

  const result = await EmployeeLeaveRequest.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await EmployeeLeaveRequest.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getLeaveRequestById = async (
  leaveRequestId: string
): Promise<IEmployeeLeaveRequest | null> => {
  const result = await EmployeeLeaveRequest.findById(leaveRequestId);
  return result;
};

const updateLeaveRequest = async (
  leaveRequestId: string,
  payload: Partial<IEmployeeLeaveRequest>
): Promise<void> => {
  const leaveRequest = await EmployeeLeaveRequest.findById(leaveRequestId);
  if (!leaveRequest) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Leave request not found');
  }
  await EmployeeLeaveRequest.findOneAndUpdate({ _id: leaveRequestId }, payload);
};

const updateLeaveRequestStatus = async (
  leaveRequestId: string,
  status: ENUM_LEAVE_STATUS
): Promise<void> => {
  const leaveRequest = await EmployeeLeaveRequest.findById(leaveRequestId);
  if (!leaveRequest) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Leave request not found');
  }
  await EmployeeLeaveRequest.findOneAndUpdate(
    { _id: leaveRequestId },
    { status }
  );
};

const deleteLeaveRequest = async (leaveRequestId: string): Promise<void> => {
  const leaveRequest = await EmployeeLeaveRequest.findById(leaveRequestId);
  if (!leaveRequest) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Leave request not found');
  }
  await EmployeeLeaveRequest.findByIdAndDelete(leaveRequestId);
};

export const EmployeeLeaveRequestService = {
  addLeaveRequest,
  getAllLeaveRequests,
  getMyLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequest,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
};
