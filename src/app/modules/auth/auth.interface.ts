import { ENUM_USER_STATUS } from '../../enums/user.enum';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  accessToken: string;
  refreshToken?: string;
  status: ENUM_USER_STATUS;
}
export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
