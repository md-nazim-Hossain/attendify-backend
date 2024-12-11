import express from 'express';

const router = express.Router();

import { CompanyDetailsController } from './companyDetails.controller';
import auth from '../../middleware/auth.middleware';
import validateRequest from '../../middleware/validateRequest.middleware';
import { CompanyDetailsValidation } from './companyDetails.validation';
import { ENUM_EMPLOYEE_ROLE } from '../../enums/employee.enum';

router.post(
  '/add-company-details',
  validateRequest(CompanyDetailsValidation.addCompanyDetailsZodSchema),
  auth(ENUM_EMPLOYEE_ROLE.ADMIN),
  CompanyDetailsController.addCompnayDetails
);

export const CompanyDetailsRoutes = router;
