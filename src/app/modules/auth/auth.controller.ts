import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status-codes';
import { IUser } from '../user/user.interface';
import {
  ILoginCompanyResponse,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import catchAsync from '../../../shared/catchAsync';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    data: result,
  });
});

const loginCompany = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id;
  const result = await AuthService.loginCompany(userId, id);
  sendResponse<ILoginCompanyResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login company Successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  await AuthService.changePassword(req.user, passwordData);
  sendResponse<null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const result = await AuthService.getMyProfile(userId);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  getMyProfile,
  loginCompany,
};
