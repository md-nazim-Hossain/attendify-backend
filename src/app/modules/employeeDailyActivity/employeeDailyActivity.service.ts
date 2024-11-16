import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/common';
import { EmployeeDailyActivityConstant } from './employeeDailyActivity.constant';
import {
  IEmployeeDailyActivity,
  IEmployeeDailyActivityFilters,
} from './employeeDailyActivity.interface';
import { EmployeeDailyActivity } from './employeeDailyActivity.model';

const createActivity = async (
  payload: IEmployeeDailyActivity
): Promise<void> => {
  await EmployeeDailyActivity.create(payload);
};

const getAllActivities = async (
  filters: IEmployeeDailyActivityFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployeeDailyActivity[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: EmployeeDailyActivityConstant.employeeDailyActivitySearchFields.map(
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
  const result = await EmployeeDailyActivity.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await EmployeeDailyActivity.countDocuments(whereConditions);

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getMyActivities = async (
  employeeId: string,
  filters: IEmployeeDailyActivityFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IEmployeeDailyActivity[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (employeeId) {
    andConditions.push({
      employeeId,
    });
  }

  if (searchTerm) {
    andConditions.push({
      $or: EmployeeDailyActivityConstant.employeeDailyActivitySearchFields.map(
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
  const result = await EmployeeDailyActivity.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await EmployeeDailyActivity.countDocuments(whereConditions);

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getActivityById = async (
  id: string
): Promise<IEmployeeDailyActivity | null> => {
  const result = await EmployeeDailyActivity.findById(id);
  return result;
};

const updateActivity = async (
  id: string,
  payload: Partial<IEmployeeDailyActivity>
): Promise<void> => {
  const activity = await EmployeeDailyActivity.findById(id);
  if (!activity) {
    throw new Error('Activity not found');
  }

  await EmployeeDailyActivity.findOneAndUpdate({ _id: id }, payload);
};

const deleteActivity = async (id: string): Promise<void> => {
  const activity = await EmployeeDailyActivity.findById(id);
  if (!activity) {
    throw new Error('Activity not found');
  }
  await EmployeeDailyActivity.findOneAndDelete({ _id: id });
};

export const EmployeeDailyActivityService = {
  createActivity,
  getAllActivities,
  getMyActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
