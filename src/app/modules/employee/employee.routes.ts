import express from 'express';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';
import { EmployeeValidation } from './employee.validation';
import validateRequest from '../../middleware/validateRequest.middleware';
import { EmployeeController } from './employee.controller';
import auth from '../../middleware/auth.middleware';
const router = express.Router();

router.get(
  '/',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeController.getAllEmployees
);

router.get(
  '/:id',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeController.getEmployeeById
);

router.post(
  '/add-employee-developer',
  validateRequest(EmployeeValidation.addEmployeeZodSchema),
  EmployeeController.addEmployee
);

router.post(
  '/add-employee',
  validateRequest(EmployeeValidation.addEmployeeZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeController.addEmployee
);

router.patch(
  '/:id',
  validateRequest(EmployeeValidation.updateEmployeeZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeController.updateEmployee
);

router.put(
  '/update-employee-status/:id',
  validateRequest(EmployeeValidation.updateEmployeeStatusZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN, ENUM_EMPLOYEE_ROLE.EMPLOYEE),
  EmployeeController.updateEmployeeStatus
);

router.post(
  '/employee-accepted-invitation',
  validateRequest(EmployeeValidation.employeeAcceptedInvitationZodSchema),
  auth(),
  EmployeeController.employeeAcceptedInvitation
);

export const EmployeeRoutes = router;
