import express from 'express';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest.middleware';
import authMiddleware from '../../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  authMiddleware,
  AuthController.changePassword
);

router.get('/profile', authMiddleware, AuthController.getMyProfile);

export const AuthRoutes = router;
