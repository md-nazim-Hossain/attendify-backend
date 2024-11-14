import express from 'express';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest.middleware';
import auth from '../../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginEmployee
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(),
  AuthController.changePassword
);

export const AuthRoutes = router;
