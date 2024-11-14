import express from 'express';
import { EmployeeRoutes } from '../modules/employee/employee.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/employee',
    route: EmployeeRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const routes = router;
