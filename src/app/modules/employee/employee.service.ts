import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IEmployee, IEmployeeFilters } from './employee.interface';
import { Employee } from './employee.model';
import { config } from '../../../config';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/common';
import { EmployeeConstant } from './employee.constant';
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';

const addEmployee = async (payload: IEmployee): Promise<void> => {
  // check if employee exist
  const isEmployeeExist = await Employee.findOne({
    employeeId: payload.employeeId,
  });

  if (isEmployeeExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Employee already exist');
  }

  if (!payload.password) {
    payload.password = config.default_password;
  }
  await Employee.create(payload);
};

const getAllEmployees = async (
  filters: IEmployeeFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployee[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: EmployeeConstant.employeeSearchFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
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

  const result = await Employee.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Employee.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getEmployeeById = async (
  employeeId: string
): Promise<IEmployee | null> => {
  const result = await Employee.findOne({ employeeId });
  return result;
};

const updateEmployee = async (
  employeeId: string,
  payload: Partial<IEmployee>
): Promise<void> => {
  const isEmployeeExist = await Employee.findOne({ employeeId });

  if (!isEmployeeExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Employee not found');
  }

  await Employee.findOneAndUpdate({ employeeId }, payload, {
    new: true,
  });
};

const updateEmployeeStatus = async (
  employeeId: string,
  status: boolean
): Promise<void> => {
  const isEmployeeExist = await Employee.findOne({ employeeId });

  if (!isEmployeeExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Employee not found');
  }

  await Employee.findOneAndUpdate(
    { employeeId },
    { status },
    {
      new: true,
    }
  );
};

export const EmployeeService = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  updateEmployeeStatus,
};
