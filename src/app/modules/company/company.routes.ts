import express from 'express';
import { CompanyController } from './company.controller';
import validateRequest from '../../middleware/validateRequest.middleware';
import { CompanyValidation } from './company.validation';
import auth from '../../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/create-company',
  validateRequest(CompanyValidation.createCompanyZodSchema),
  auth(),
  CompanyController.createCompany
);

router.get('/', auth(), CompanyController.getAllMyCompanies);
router.get('/my-companies', auth(), CompanyController.getMyCompanies);
export const CompanyRoutes = router;
