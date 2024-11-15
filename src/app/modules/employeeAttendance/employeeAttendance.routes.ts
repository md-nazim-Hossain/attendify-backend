import express from 'express';
import { EmployeeAttendanceController } from './employeeAttendance.controller';
import auth from '../../middleware/auth.middleware';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';

const router = express.Router();

const { ADMIN, EMPLOYEE } = ENUM_EMPLOYEE_ROLE;
router.get('/', auth(ADMIN), EmployeeAttendanceController.getAllAttendances);
router.get(
  '/:id',
  auth(ADMIN, EMPLOYEE),
  EmployeeAttendanceController.getAttendanceById
);

router.get(
  '/my-attendances',
  auth(ADMIN, EMPLOYEE),
  EmployeeAttendanceController.getAllMyAttendances
);

router.get(
  '/employee/:id',
  auth(ADMIN),
  EmployeeAttendanceController.getAllAttendancesByEmployeeId
);

router.patch(
  '/:id',
  auth(ADMIN),
  EmployeeAttendanceController.updateAttendanceStatus
);

router.post(
  '/check-in',
  auth(EMPLOYEE),
  EmployeeAttendanceController.employeeCheckIn
);
router.post(
  '/check-out',
  auth(EMPLOYEE),
  EmployeeAttendanceController.employeeCheckOut
);

export const EmployeeAttendanceRoutes = router;
