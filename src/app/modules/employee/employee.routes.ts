import express from 'express';
import auth from '../../middleware/auth.middleware';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';
const router = express.Router();

router.post(
  '/create-employee',
  //   validateRequest(),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN)
);

export const EmployeeRoutes = router;
