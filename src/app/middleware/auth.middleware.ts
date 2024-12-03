import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import StatusCode from 'http-status-codes';
import { config } from '../../config';
import jwt, { Secret } from 'jsonwebtoken';
import { Employee } from '../modules/employee/employee.model';

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token from header
      let token =
        req.headers.authorization ||
        req.headers.Authorization ||
        req.cookies.accessToken;
      if (!token) {
        throw new ApiError(StatusCode.UNAUTHORIZED, 'No token provided');
      }

      token = token.split(' ')[1];

      if (!token) {
        throw new ApiError(StatusCode.UNAUTHORIZED, 'No token provided');
      }

      //verify token
      const verifiedUser = jwt.verify(
        token,
        config.jwt.access_token_secret as Secret
      ) as jwt.JwtPayload;

      if (!verifiedUser || !verifiedUser._id) {
        throw new ApiError(StatusCode.UNAUTHORIZED, 'Unauthorized request');
      }
      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(StatusCode.FORBIDDEN, 'Forbidden');
      }
      return next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
