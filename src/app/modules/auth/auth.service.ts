import mongoose from 'mongoose';
import { config } from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginCompanyResponse,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import httpStatus, { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Company } from '../company/company.model';
import { Employee } from '../employee/employee.model';

const generateAccessAndRefreshToken = async (usersId: string) => {
  try {
    const user = await User.findById(usersId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong,when generating access and refresh token'
    );
  }
};
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const user = new User();
  const isUserExist = await user.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (!(await user.isPasswordMatch(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    isUserExist._id as string
  );

  return {
    accessToken,
    refreshToken,
    status: isUserExist.status,
  };
};

const loginCompany = async (
  userId: string,
  companyId: string
): Promise<ILoginCompanyResponse> => {
  const isCompanyExist = await Company.findById(companyId);
  if (!isCompanyExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Company does not exist');
  }

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isEmployeeExist = await Employee.findOne({
    $and: [
      { company: new mongoose.Types.ObjectId(companyId) },
      { user: new mongoose.Types.ObjectId(userId) },
    ],
  });

  if (!isEmployeeExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee does not exist');
  }

  if (isEmployeeExist.status !== 'active') {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Unauthorized, employee is not active'
    );
  }

  const accessToken = isUserExist.generateAccessToken({
    role: isEmployeeExist.role,
    employeeId: isEmployeeExist.employeeId,
    employeeObjectId: isEmployeeExist.id,
    companyId,
  });
  const refreshToken = isUserExist.generateRefreshToken();

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
  const { email }: any = verifyToken;

  const user = new User();
  const isUserExist = await user.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new access token
  const newAccessToken = user.generateAccessToken();

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const userModel = new User();
  if (!(await userModel.isUserExist(user.email))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (!(await userModel.isPasswordMatch(oldPassword, userModel.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  userModel.password = newPassword;
  userModel.passwordChangeAt = new Date();
  await userModel.save({
    validateBeforeSave: false,
  });
};

const getMyProfile = async (id: string): Promise<IUser> => {
  const result = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        password: 0,
        __v: 0,
        passwordChangeAt: 0,
      },
    },

    {
      $lookup: {
        from: 'employees',
        localField: '_id',
        foreignField: 'user',
        as: 'employee',
        pipeline: [
          {
            $match: {
              status: 'active',
            },
          },
        ],
      },
    },
    {
      $addFields: {
        employee: {
          $arrayElemAt: ['$employee', 0],
        },
      },
    },
  ]);
  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee does not exist');
  }
  return result[0];
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  getMyProfile,
  loginCompany,
};
