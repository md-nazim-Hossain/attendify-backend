import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const addEmployee = catchAsync(async (req: Request, res: Response) => {});

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {});

const getAllEmployee = catchAsync(async (req: Request, res: Response) => {});

export const EmployeeController = {
  addEmployee,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployee,
};
