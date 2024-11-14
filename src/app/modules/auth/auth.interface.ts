export interface ILoginEmployee {
  employeeId: string;
  password: string;
}

export interface ILoginEmployeeResponse {
  accessToken: string;
  refreshToken?: string;
  status: boolean;
}
export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
