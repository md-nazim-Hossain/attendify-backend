import express from 'express';
import { EmployeeAttendanceController } from './employeeAttendance.controller';
import auth from '../../middleware/auth.middleware';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';
import validateRequest from '../../middleware/validateRequest.middleware';
import { EmployeeAttendanceValidation } from './employeeAttendance.validation';

const router = express.Router();

const { ADMIN, EMPLOYEE } = ENUM_EMPLOYEE_ROLE;

// Routes for employee attendance
router.post(
  '/check-in',
  validateRequest(EmployeeAttendanceValidation.checkInZodSchema),
  auth(EMPLOYEE, ADMIN),
  EmployeeAttendanceController.employeeCheckIn
);

router.post(
  '/check-out',
  validateRequest(EmployeeAttendanceValidation.checkOutZodSchema),
  auth(EMPLOYEE, ADMIN),
  EmployeeAttendanceController.employeeCheckOut
);

router.get(
  '/check-today-is-attendance',
  auth(ADMIN, EMPLOYEE),
  EmployeeAttendanceController.getCheckTodayIsAttendance
);

// Routes for getting attendance records
router.get('/', auth(ADMIN), EmployeeAttendanceController.getAllAttendances);

router.get(
  '/my-attendances',
  auth(ADMIN, EMPLOYEE),
  EmployeeAttendanceController.getAllMyAttendances
);

router.get(
  '/:id',
  auth(ADMIN, EMPLOYEE),
  EmployeeAttendanceController.getAttendanceById
);

router.get(
  '/employee/:id',
  auth(ADMIN),
  EmployeeAttendanceController.getAllAttendancesByEmployeeId
);

// Route for updating attendance status
router.patch(
  '/:id',
  auth(ADMIN),
  EmployeeAttendanceController.updateAttendanceStatus
);

export const EmployeeAttendanceRoutes = router;
