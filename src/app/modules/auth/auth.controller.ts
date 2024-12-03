import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status-codes';
import { IUser } from '../user/user.interface';
import { IRefreshTokenResponse } from './auth.interface';

const loginUser = async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
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
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    data: result,
  });
};

const changePassword = async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  await AuthService.changePassword(req.user, passwordData);
  sendResponse<null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
  });
};

const getMyProfile = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const result = await AuthService.getMyProfile(userId);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
};

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  getMyProfile,
};
