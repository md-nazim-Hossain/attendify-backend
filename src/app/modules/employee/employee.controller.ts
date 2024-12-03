import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { EmployeeService } from './employee.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { EmployeeConstant } from './employee.constant';
import { paginationFields } from '../../constant/paginationConstant';
import { IPaginationOptions } from '../../../interface/common';
import { IEmployee } from './employee.interface';

const addEmployee = catchAsync(async (req: Request, res: Response) => {
  const { ...employeeData } = req.body;
  await EmployeeService.addEmployee(employeeData);
  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message:
      'Employee added successfully and send the sms employee for employee activation',
  });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, EmployeeConstant.employeeFilterableFields);
  const pagination: IPaginationOptions = pick(req.query, paginationFields);

  const result = await EmployeeService.getAllEmployees(filters, pagination);
  sendResponse<IEmployee[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Employee fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getEmployeeById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EmployeeService.getEmployeeById(id);
  sendResponse<IEmployee>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Employee fetched successfully by id',
    data: result,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const { ...employeeData } = req.body;
  const { id } = req.params;
  await EmployeeService.updateEmployee(id, employeeData);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Employee updated successfully',
  });
});

const updateEmployeeStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  await EmployeeService.updateEmployeeStatus(id, status);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Employee status updated successfully',
  });
});

export const EmployeeController = {
  addEmployee,
  updateEmployee,
  updateEmployeeStatus,
  getAllEmployees,
  getEmployeeById,
};
