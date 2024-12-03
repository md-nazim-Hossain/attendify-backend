import express from 'express';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest.middleware';
import authMiddleware from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/:id', authMiddleware, UserController.getUserById);
router.post(
  '/signup',
  validateRequest(UserValidation.signUpZodSchema),
  UserController.signUpUser
);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  authMiddleware,
  UserController.updateUser
);

router.put(
  '/:id',
  authMiddleware,
  validateRequest(UserValidation.updateUserStatusZodSchema),
  UserController.activeInactiveUser
);

router.delete('/:id', authMiddleware, UserController.deleteUser);

export const UserRoutes = router;
