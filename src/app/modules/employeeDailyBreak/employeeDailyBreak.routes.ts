import express from 'express';
import auth from '../../middleware/auth.middleware';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';
import { EmployeeDailyBreakController } from './employeeDailyBreak.controller';
import validateRequest from '../../middleware/validateRequest.middleware';
import { EmployeeDailyBreakValidation } from './employeeDailyBreak.validation';

const router = express.Router();

router.post(
  '/add-daily-break',
  validateRequest(EmployeeDailyBreakValidation.addEmployeeDailyBreakZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE)
);
router.get(
  '/',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeDailyBreakController.getAllEmployeeDailyBreaks
);
router.get(
  '/:id',
  auth(),
  EmployeeDailyBreakController.getEmployeeDailyBreakById
);

router.get(
  '/my-daily-breaks',
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE),
  EmployeeDailyBreakController.getAllMyDailyBreaks
);
router.patch(
  '/:id',
  validateRequest(
    EmployeeDailyBreakValidation.updateEmployeeDailyBreakZodSchema
  ),
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE),
  EmployeeDailyBreakController.updateEmployeeDailyBreak
);

router.delete(
  '/:id',
  auth(),
  EmployeeDailyBreakController.deleteEmployeeDailyBreak
);

export const EmployeeDailyBreakRoutes = router;
