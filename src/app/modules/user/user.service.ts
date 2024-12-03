import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { ENUM_USER_STATUS } from '../../enums/user.enum';

const getUserById = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};
const signUpUser = async (payload: IUser): Promise<void> => {
  // check if user exist
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'User already exist');
  }

  await User.create(payload);
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<void> => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  await User.findOneAndUpdate({ _id: id }, payload);
};

const deleteUser = async (id: string): Promise<void> => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  await User.findOneAndDelete({ _id: id });
};

const activeInactiveUser = async (
  id: string,
  status: ENUM_USER_STATUS
): Promise<void> => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  await User.findOneAndUpdate({ _id: id }, { status });
};

export const UserService = {
  signUpUser,
  updateUser,
  deleteUser,
  activeInactiveUser,
  getUserById,
};
