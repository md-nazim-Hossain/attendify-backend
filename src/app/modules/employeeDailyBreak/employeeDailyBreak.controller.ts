import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { EmployeeDailyBreakService } from './employeeDailyBreak.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IPaginationOptions } from '../../../interface/common';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constant/paginationConstant';
import { EmployeeDailyBreakConstant } from './employeeDailyBreak.constant';
import { IEmployeeDailyBreak } from './employeeDailyBreak.interface';

const addEmployeeDailyBreak = catchAsync(
  async (req: Request, res: Response) => {
    const { ...employeeDailyBreakData } = req.body;
    await EmployeeDailyBreakService.addEmployeeDailyBreak({
      ...employeeDailyBreakData,
      employeeId: req.employee?.employeeId,
    });
    sendResponse<null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Employee daily break created successfully',
    });
  }
);

const getAllEmployeeDailyBreaks = catchAsync(
  async (req: Request, res: Response) => {
    const pagination: IPaginationOptions = pick(req.query, paginationFields);
    const filters = pick(
      req.query,
      EmployeeDailyBreakConstant.employeeDailyBreakFilterableFields
    );
    const result = await EmployeeDailyBreakService.getAllEmployeeDailyBreaks(
      filters,
      pagination
    );
    sendResponse<IEmployeeDailyBreak[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Employee daily breaks fetched successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getEmployeeDailyBreakById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await EmployeeDailyBreakService.getEmployeeDailyBreakById(id);
    sendResponse<IEmployeeDailyBreak>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Employee daily break fetched successfully',
      data: result,
    });
  }
);

const getAllMyDailyBreaks = catchAsync(async (req: Request, res: Response) => {
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const filters = pick(
    req.query,
    EmployeeDailyBreakConstant.employeeDailyBreakFilterableFields
  );
  const result = await EmployeeDailyBreakService.getAllMyDailyBreaks(
    req.employee.employeeId,
    filters,
    pagination
  );
  sendResponse<IEmployeeDailyBreak[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My daily breaks fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const updateEmployeeDailyBreak = catchAsync(
  async (req: Request, res: Response) => {
    const { ...employeeData } = req.body;
    const { id } = req.params;
    await EmployeeDailyBreakService.updateEmployeeDailyBreak(id, employeeData);
    sendResponse<null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Employee daily break update successfully',
    });
  }
);

const deleteEmployeeDailyBreak = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await EmployeeDailyBreakService.deleteEmployeeDailyBreak(id);
    sendResponse<null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Employee daily break deleted successfully',
    });
  }
);

export const EmployeeDailyBreakController = {
  addEmployeeDailyBreak,
  deleteEmployeeDailyBreak,
  updateEmployeeDailyBreak,
  getAllMyDailyBreaks,
  getEmployeeDailyBreakById,
  getAllEmployeeDailyBreaks,
};
