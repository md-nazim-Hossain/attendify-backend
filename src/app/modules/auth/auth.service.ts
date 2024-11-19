import { config } from '../../../config';
import ApiError from '../../../errors/ApiError';
import { Employee } from '../employee/employee.model';
import {
  IChangePassword,
  ILoginEmployee,
  ILoginEmployeeResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const loginEmployee = async (
  payload: ILoginEmployee
): Promise<ILoginEmployeeResponse> => {
  const { employeeId, password } = payload;
  const employee = new Employee();
  const isEmployeeExist = await employee.isEmployeeExist(employeeId);
  if (!isEmployeeExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee does not exist');
  }

  if (!(await employee.isPasswordMatch(password, isEmployeeExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const refreshToken = employee.generateRefreshToken();
  const accessToken = employee.generateAccessToken();

  return {
    accessToken,
    refreshToken,
    status: isEmployeeExist.status,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = jwt.verify(token, config.jwt.refresh_token_secret as Secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { employeeId }: any = verifyToken;

  const employee = new Employee();
  const isEmployeeExist = await employee.isEmployeeExist(employeeId);

  if (!isEmployeeExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee does not exist');
  }

  //generate new access token
  const newAccessToken = employee.generateAccessToken();

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  employee: JwtPayload,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const employeeModel = new Employee();
  if (!(await employeeModel.isEmployeeExist(employee.employeeId))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee does not exist');
  }

  if (
    !(await employeeModel.isPasswordMatch(oldPassword, employeeModel.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  employeeModel.password = newPassword;
  employeeModel.passwordChangeAt = new Date();
  await employeeModel.save({
    validateBeforeSave: false,
  });
};

export const AuthService = {
  loginEmployee,
  refreshToken,
  changePassword,
};
