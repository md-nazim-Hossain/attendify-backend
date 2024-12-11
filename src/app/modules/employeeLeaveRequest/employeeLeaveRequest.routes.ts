import express from 'express';

const router = express.Router();

import { EmployeeLeaveRequestController } from './employeeLeaveRequest.controller';
import auth from '../../middleware/auth.middleware';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';
import validateRequest from '../../middleware/validateRequest.middleware';
import { EmployeeLeaveRequestValidation } from './employeeLeaveRequest.validation';

router.post(
  '/add-leave-request',
  validateRequest(EmployeeLeaveRequestValidation.addLeaveRequestZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE, ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeLeaveRequestController.addLeaveRequest
);

router.get(
  '/my-leave-requests',
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE, ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeLeaveRequestController.getMyLeaveRequests
);

router.get(
  '/get-all-leave-requests',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeLeaveRequestController.getAllLeaveRequests
);

router.get('/:id', auth(), EmployeeLeaveRequestController.getLeaveRequestById);

router.patch(
  '/:id',
  validateRequest(EmployeeLeaveRequestValidation.updateLeaveRequestZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE),
  EmployeeLeaveRequestController.updateLeaveRequest
);

router.put(
  '/update-leave-request-status/:id',
  validateRequest(
    EmployeeLeaveRequestValidation.updateLeaveRequestStatusZodSchema
  ),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  EmployeeLeaveRequestController.updateLeaveRequestStatus
);

router.delete(
  '/:id',
  auth(),
  EmployeeLeaveRequestController.deleteLeaveRequest
);

export const EmployeeLeaveRequestRoutes = router;
