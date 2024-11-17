import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { EmployeeLeaveRequestService } from './employeeLeaveRequest.service';
import { EmployeeLeaveRequestConstant } from './employeeLeaveRequest.constant';
import { IPaginationOptions } from '../../../interface/common';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constant/paginationConstant';
import { IEmployeeLeaveRequest } from './employeeLeaveRequest.interface';

const addLeaveRequest = catchAsync(async (req: Request, res: Response) => {
  const { ...employeeLeaveRequest } = req.body;
  await EmployeeLeaveRequestService.addLeaveRequest({
    ...employeeLeaveRequest,
    employeeId: req.employee?.employeeId,
  });
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Leave request added successfully',
  });
});

const getAllLeaveRequests = catchAsync(async (req: Request, res: Response) => {
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const filters = pick(
    req.query,
    EmployeeLeaveRequestConstant.employeeLeaveRequestFilterableFields
  );
  const result = await EmployeeLeaveRequestService.getAllLeaveRequests(
    filters,
    pagination
  );
  sendResponse<IEmployeeLeaveRequest[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Leave requests fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getMyLeaveRequests = catchAsync(async (req: Request, res: Response) => {
  const employeeId = req.employee?.employeeId;
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const filters = pick(
    req.query,
    EmployeeLeaveRequestConstant.employeeLeaveRequestFilterableFields
  );
  const result = await EmployeeLeaveRequestService.getMyLeaveRequests(
    employeeId,
    filters,
    pagination
  );
  sendResponse<IEmployeeLeaveRequest[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My leave requests fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getLeaveRequestById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeLeaveRequestService.getLeaveRequestById(id);
  sendResponse<IEmployeeLeaveRequest>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Leave request fetched successfully by id',
    data: result,
  });
});

const updateLeaveRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await EmployeeLeaveRequestService.updateLeaveRequest(id, req.body);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Leave request updated successfully',
  });
});

const updateLeaveRequestStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    await EmployeeLeaveRequestService.updateLeaveRequestStatus(id, status);
    sendResponse<void>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Leave request status updated successfully',
    });
  }
);

const deleteLeaveRequest = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await EmployeeLeaveRequestService.deleteLeaveRequest(id);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Leave request deleted successfully',
  });
});

export const EmployeeLeaveRequestController = {
  addLeaveRequest,
  getAllLeaveRequests,
  getMyLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequest,
  updateLeaveRequestStatus,
  deleteLeaveRequest,
};
