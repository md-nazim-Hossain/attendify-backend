import express from 'express';

const router = express.Router();

import { EmployeeDailyActivityController } from './employeeDailyActivity.controller';
import auth from '../../middleware/auth.middleware';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';
import validateRequest from '../../middleware/validateRequest.middleware';
import { EmployeeDailyActivityValidation } from './employeeDailyActivity.validation';

router.get(
  '/',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeDailyActivityController.getAllActivities
);

router.get(
  '/my-activities',
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE),
  EmployeeDailyActivityController.getMyActivities
);

router.get('/:id', auth(), EmployeeDailyActivityController.getActivityById);

router.post(
  '/create-activity',
  validateRequest(EmployeeDailyActivityValidation.createDailyActivityZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE),
  EmployeeDailyActivityController.createActivity
);

router.patch(
  '/:id',
  validateRequest(EmployeeDailyActivityValidation.updateDailyActivityZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE),
  EmployeeDailyActivityController.updateActivity
);

router.delete(
  '/:id',
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE),
  EmployeeDailyActivityController.deleteActivity
);

export const EmployeeDailyActivityRoutes = router;
