import express from 'express';
import auth from '../../middleware/auth.middleware';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';
import { ProjectController } from './project.controller';
import validateRequest from '../../middleware/validateRequest.middleware';
import { ProjectValidation } from './project.validation';

const router = express.Router();

router.post(
  '/add-project',
  validateRequest(ProjectValidation.addProjectZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  ProjectController.addProject
);
router.get(
  '/get-all-projects',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  ProjectController.getAllProjects
);

router.get('/:id', auth(), ProjectController.getProjectById);
router.patch(
  '/:id',
  validateRequest(ProjectValidation.updateProjectZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  ProjectController.updateProject
);
router.delete(
  '/:id',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  ProjectController.deleteProject
);

export const ProjectRoutes = router;
