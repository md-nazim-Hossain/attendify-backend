import express from 'express';
import { EmployeeRoutes } from '../modules/employee/employee.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { EmployeeAttendanceRoutes } from '../modules/employeeAttendance/employeeAttendance.routes';
import { EmployeeDailyActivityRoutes } from '../modules/employeeDailyActivity/employeeDailyActivity.routes';
import { EmployeeLeaveRequestRoutes } from '../modules/employeeLeaveRequest/employeeLeaveRequest.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/employee',
    route: EmployeeRoutes,
  },
  {
    path: '/attendance',
    route: EmployeeAttendanceRoutes,
  },
  {
    path: '/employee-daily-activity',
    route: EmployeeDailyActivityRoutes,
  },
  {
    path: '/employee-leave-request',
    route: EmployeeLeaveRequestRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const routes = router;
