import express from 'express';
import auth from '../../middleware/auth.middleware';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';
import { EmployeeValidation } from './employee.validation';
import validateRequest from '../../middleware/validateRequest.middleware';
import { EmployeeController } from './employee.controller';
const router = express.Router();

router.get(
  '/',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeController.getAllEmployees
);

router.get('/:id', auth(), EmployeeController.getEmployeeById);

router.post(
  '/add-employee',
  validateRequest(EmployeeValidation.addEmployeeZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeController.addEmployee
);

router.patch(
  '/:id',
  validateRequest(EmployeeValidation.updateEmployeeZodSchema),
  auth(),
  EmployeeController.updateEmployee
);

router.put(
  '/:id',
  validateRequest(EmployeeValidation.updateEmployeeStatusZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeController.updateEmployeeStatus
);

export const EmployeeRoutes = router;
