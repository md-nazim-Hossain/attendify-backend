import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/common';
import {
  IEmployeeDailyBreak,
  IEmployeeDailyBreakFilters,
} from './employeeDailyBreak.interface';
import { EmployeeDailyBreak } from './employeeDailyBreak.model';
import { EmployeeDailyBreakConstant } from './employeeDailyBreak.constant';

const addEmployeeDailyBreak = async (
  payload: IEmployeeDailyBreak
): Promise<void> => {
  await EmployeeDailyBreak.create(payload);
};

const getAllEmployeeDailyBreaks = async (
  filters: IEmployeeDailyBreakFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployeeDailyBreak[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: EmployeeDailyBreakConstant.employeeDailyBreakSearchFields.map(
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

  const result = await EmployeeDailyBreak.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await EmployeeDailyBreak.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getEmployeeDailyBreakById = async (
  id: string
): Promise<IEmployeeDailyBreak | null> => {
  const result = await EmployeeDailyBreak.findById(id);
  return result;
};

const getAllMyDailyBreaks = async (
  employeeId: string,
  filters: IEmployeeDailyBreakFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployeeDailyBreak[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (employeeId) {
    andConditions.push({
      employeeId,
    });
  }

  if (searchTerm) {
    andConditions.push({
      $or: EmployeeDailyBreakConstant.employeeDailyBreakSearchFields.map(
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

  const result = await EmployeeDailyBreak.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await EmployeeDailyBreak.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateEmployeeDailyBreak = async (
  id: string,
  payload: Partial<IEmployeeDailyBreak>
): Promise<void> => {
  await EmployeeDailyBreak.findOneAndUpdate({ _id: id }, payload);
};

const deleteEmployeeDailyBreak = async (id: string): Promise<void> => {
  await EmployeeDailyBreak.findOneAndDelete({ _id: id });
};

export const EmployeeDailyBreakService = {
  addEmployeeDailyBreak,
  getAllEmployeeDailyBreaks,
  getEmployeeDailyBreakById,
  updateEmployeeDailyBreak,
  deleteEmployeeDailyBreak,
  getAllMyDailyBreaks,
};
