import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status-codes';
import { IEmployee } from '../employee/employee.interface';

const loginEmployee = async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginEmployee(loginData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    data: result,
  });
};

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    data: result,
  });
};

const changePassword = async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(req.employee, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
};

const getMyProfile = async (req: Request, res: Response) => {
  const employeeId = req.employee?.employeeId;
  const result = await AuthService.getMyProfile(employeeId);
  sendResponse<IEmployee>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
};

export const AuthController = {
  loginEmployee,
  refreshToken,
  changePassword,
  getMyProfile,
};
