import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IEmployee, IEmployeeFilters } from './employee.interface';
import { Employee } from './employee.model';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/common';
import { EmployeeConstant } from './employee.constant';
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { ENUM_EMPLOYEE_STATUS } from '../../enums/employee.enum';

const addEmployee = async (payload: IEmployee): Promise<void> => {
  // check if employee exist
  const isEmployeeExist = await Employee.findOne({
    $and: [
      { employeeId: payload.employeeId },
      { company: new mongoose.Types.ObjectId(payload.company as string) },
    ],
  });

  if (isEmployeeExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Employee already exist');
  }

  await Employee.create(payload);
};

const getAllEmployees = async (
  companyId: string,
  filters: IEmployeeFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployee[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (companyId) {
    andConditions.push({
      company: new mongoose.Types.ObjectId(companyId),
    });
  }

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
  employeeId: string,
  companyId: string
): Promise<IEmployee> => {
  const result = await Employee.findOne({
    $and: [{ employeeId }, { company: new mongoose.Types.ObjectId(companyId) }],
  });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Employee not found');
  }
  return result;
};

const updateEmployee = async (
  employeeId: string,
  companyId: string,
  payload: Partial<IEmployee>
): Promise<void> => {
  const isEmployeeExist = await Employee.findOne({
    $and: [{ employeeId }, { company: new mongoose.Types.ObjectId(companyId) }],
  });

  if (!isEmployeeExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Employee not found');
  }

  await Employee.findOneAndUpdate(
    {
      $and: [
        { employeeId },
        { company: new mongoose.Types.ObjectId(companyId) },
      ],
    },
    payload
  );
};

const updateEmployeeStatus = async (
  employeeId: string,
  companyId: string,
  status: ENUM_EMPLOYEE_STATUS
): Promise<void> => {
  const isEmployeeExist = await Employee.findOne({
    $and: [{ employeeId }, { company: new mongoose.Types.ObjectId(companyId) }],
  });

  if (!isEmployeeExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Employee not found');
  }

  await Employee.findOneAndUpdate(
    {
      $and: [
        { employeeId },
        { company: new mongoose.Types.ObjectId(companyId) },
      ],
    },
    { status }
  );
};

const employeeAcceptedInvitation = async (
  userId: string,
  employeeId: string,
  companyId: string
) => {
  const isEmployeeExist = await Employee.findOne({
    $and: [{ employeeId }, { company: new mongoose.Types.ObjectId(companyId) }],
  });

  if (!isEmployeeExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Employee not found');
  }

  if (isEmployeeExist.status === 'active') {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Employee already accepted invitation'
    );
  }

  await Employee.findOneAndUpdate(
    {
      $and: [
        { employeeId },
        { company: new mongoose.Types.ObjectId(companyId) },
      ],
    },
    { status: 'active', user: new mongoose.Types.ObjectId(userId) }
  );
};

export const EmployeeService = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  updateEmployeeStatus,
  employeeAcceptedInvitation,
};
