import express from 'express';
import { EmployeeRoutes } from '../modules/employee/employee.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { EmployeeAttendanceRoutes } from '../modules/employeeAttendance/employeeAttendance.routes';
import { EmployeeDailyActivityRoutes } from '../modules/employeeDailyActivity/employeeDailyActivity.routes';
import { EmployeeLeaveRequestRoutes } from '../modules/employeeLeaveRequest/employeeLeaveRequest.routes';
import { TeamRoutes } from '../modules/team/team.routes';
import { EmployeeDailyBreakRoutes } from '../modules/employeeDailyBreak/employeeDailyBreak.routes';
import { ProjectRoutes } from '../modules/project/project.routes';

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
    path: '/daily-activity',
    route: EmployeeDailyActivityRoutes,
  },
  {
    path: '/leave-request',
    route: EmployeeLeaveRequestRoutes,
  },
  {
    path: '/team',
    route: TeamRoutes,
  },
  {
    path: '/daily-break',
    route: EmployeeDailyBreakRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const routes = router;
