import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EmployeeDailyActivityService } from './employeeDailyActivity.service';
import { StatusCodes } from 'http-status-codes';
import { IPaginationOptions } from '../../../interface/common';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constant/paginationConstant';
import { EmployeeDailyActivityConstant } from './employeeDailyActivity.constant';
import { IEmployeeDailyActivity } from './employeeDailyActivity.interface';

const createActivity = catchAsync(async (req: Request, res: Response) => {
  const { ...activityData } = req.body;
  await EmployeeDailyActivityService.createActivity({
    ...activityData,
    employeeId: req.employee?.employeeId,
  });
  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Activity created successfully',
  });
});

const getAllActivities = catchAsync(async (req: Request, res: Response) => {
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const filters = pick(
    req.query,
    EmployeeDailyActivityConstant.employeeDailyActivityFilterableFields
  );
  const result = await EmployeeDailyActivityService.getAllActivities(
    filters,
    pagination
  );
  sendResponse<IEmployeeDailyActivity[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Activities fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getMyActivities = catchAsync(async (req: Request, res: Response) => {
  const employeeId = req.employee?.employeeId;
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const filters = pick(
    req.query,
    EmployeeDailyActivityConstant.employeeDailyActivityFilterableFields
  );
  const result = await EmployeeDailyActivityService.getMyActivities(
    employeeId,
    filters,
    pagination
  );
  sendResponse<IEmployeeDailyActivity[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My activities fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getActivityById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeDailyActivityService.getActivityById(id);
  sendResponse<IEmployeeDailyActivity>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Activity fetched by id successfully',
    data: result,
  });
});

const updateActivity = catchAsync(async (req: Request, res: Response) => {
  const { ...activityData } = req.body;
  const { id } = req.params;
  await EmployeeDailyActivityService.updateActivity(id, activityData);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Activity updated successfully',
  });
});

const deleteActivity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await EmployeeDailyActivityService.deleteActivity(id);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Activity deleted successfully',
  });
});

export const EmployeeDailyActivityController = {
  createActivity,
  getAllActivities,
  getMyActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
