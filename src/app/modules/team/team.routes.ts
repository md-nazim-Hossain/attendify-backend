import express from 'express';

const router = express.Router();
import { TeamController } from './team.controller';
import auth from '../../middleware/auth.middleware';
import validateRequest from '../../middleware/validateRequest.middleware';
import { TeamValidation } from './team.validation';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';

router.post(
  '/add-team',
  validateRequest(TeamValidation.addTeamZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  TeamController.addTeam
);
router.get(
  '/get-all-teams',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  TeamController.getAllTeams
);
router.get(
  '/get-my-team',
  auth(ENUM_EMPLOYEE_ROLE.EMPLOYEE),
  TeamController.getMyTeam
);
router.get('/:id', auth(), TeamController.getTeamById);
router.patch(
  '/:id',
  validateRequest(TeamValidation.updateTeamZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  TeamController.updateTeam
);

router.put(
  '/update-team-status/:id',
  validateRequest(TeamValidation.updateTeamStatusZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  TeamController.updateTeamStatus
);

router.delete(
  '/:id',
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  TeamController.deleteTeam
);

export const TeamRoutes = router;
