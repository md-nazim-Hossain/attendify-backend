import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import StatusCode from 'http-status-codes';
import { config } from '../../config';
import jwt, { Secret } from 'jsonwebtoken';

const authMiddleware = async (
  req: Request,
  __: Response,
  next: NextFunction
) => {
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

    return next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
