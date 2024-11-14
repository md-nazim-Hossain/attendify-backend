import express from 'express';
import { EmployeeRoutes } from '../modules/employee/employee.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/employee',
    route: EmployeeRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const routes = router;
