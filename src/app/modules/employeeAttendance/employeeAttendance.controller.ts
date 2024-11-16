import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EmployeeAttendanceService } from './employeeAttendance.service';
import { IPaginationOptions } from '../../../interface/common';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constant/paginationConstant';
import { EmployeeAttendanceConstant } from './employeeAttendance.constant';
import { IEmployeeAttendance } from './employeeAttendance.interface';

const employeeCheckIn = catchAsync(async (req, res) => {
  const { ...employeeData } = req.body;
  const ip =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown IP';
  const browser = req.useragent?.browser || 'Unknown Browser';
  const device = req.useragent?.platform || 'Unknown Device';

  await EmployeeAttendanceService.employeeCheckIn({
    ...employeeData,
    employeeId: req.employee?.employeeId,
    ip,
    browser,
    device,
  });
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Employee checked in successfully',
  });
});

const employeeCheckOut = catchAsync(async (req, res) => {
  const { ...employeeData } = req.body;
  await EmployeeAttendanceService.employeeCheckOut(employeeData);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Employee checked out successfully',
  });
});

const getAllMyAttendances = catchAsync(async (req, res) => {
  const employeeId = req.employee?.employeeId;
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const filters = pick(
    req.query,
    EmployeeAttendanceConstant.employeeAttendanceFilterableFields
  );
  const result =
    await EmployeeAttendanceService.getAllMyAttendances(employeeId);
  sendResponse<IEmployeeAttendance[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My attendances fetched successfully',
    data: result,
  });
});

const getAllAttendances = catchAsync(async (req, res) => {
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const filters = pick(
    req.query,
    EmployeeAttendanceConstant.employeeAttendanceFilterableFields
  );
  const result = await EmployeeAttendanceService.getAllAttendances(
    filters,
    pagination
  );
  sendResponse<IEmployeeAttendance[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All attendances fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getAllAttendancesByEmployeeId = catchAsync(async (req, res) => {
  const employeeId = req.params.id;
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const filters = pick(
    req.query,
    EmployeeAttendanceConstant.employeeAttendanceFilterableFields
  );
  const result = await EmployeeAttendanceService.getAllAttendancesByEmployeeId(
    employeeId,
    filters,
    pagination
  );
  sendResponse<IEmployeeAttendance[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Employee attendances fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getAttendanceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EmployeeAttendanceService.getAttendanceById(id);
  sendResponse<IEmployeeAttendance>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Attendance fetched by id successfully',
    data: result,
  });
});

const updateAttendanceStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await EmployeeAttendanceService.updateAttendanceStatus(id, status);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Attendance status updated successfully',
  });
});

export const EmployeeAttendanceController = {
  employeeCheckIn,
  employeeCheckOut,
  getAllMyAttendances,
  getAllAttendances,
  getAttendanceById,
  updateAttendanceStatus,
  getAllAttendancesByEmployeeId,
};
