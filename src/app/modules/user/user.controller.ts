import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IUser } from './user.interface';

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id);
  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  await UserService.signUpUser(userData);
  sendResponse<null>(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User created successfully',
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updateData } = req.body;
  await UserService.updateUser(id, updateData);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
  });
});

const activeInactiveUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  await UserService.activeInactiveUser(id, status);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User status updated successfully',
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await UserService.deleteUser(id);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User deleted successfully',
  });
});

export const UserController = {
  signUpUser,
  updateUser,
  activeInactiveUser,
  deleteUser,
  getUserById,
};
