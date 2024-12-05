import express from 'express';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest.middleware';
import auth from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/:id', auth(), UserController.getUserById);
router.post(
  '/signup',
  validateRequest(UserValidation.signUpZodSchema),
  UserController.signUpUser
);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(),
  UserController.updateUser
);

router.put(
  '/:id',
  validateRequest(UserValidation.updateUserStatusZodSchema),
  auth(),
  UserController.activeInactiveUser
);

router.delete('/:id', auth(), UserController.deleteUser);

export const UserRoutes = router;
