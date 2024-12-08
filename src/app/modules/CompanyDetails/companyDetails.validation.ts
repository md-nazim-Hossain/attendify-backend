import { z } from 'zod';
import {
  ENUM_COMPANY_SIZE,
  ENUM_COMPANY_TYPE,
} from '../../enums/companyDetails.enum';

const addCompanyDetailsZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Invalid email address' }),
    phone: z.string().optional(),
    address: z.string({
      required_error: 'Address is required',
    }),
    type: z
      .enum([...Object.values(ENUM_COMPANY_TYPE)] as [string, ...string[]])
      .optional(),
    size: z
      .enum([...Object.values(ENUM_COMPANY_SIZE)] as [string, ...string[]])
      .optional(),
    description: z.string().optional(),
    regNumber: z.string().optional(),
    totlaEmployees: z.number().optional(),
    website: z.string().optional(),
    logo: z.string().optional(),
    officeStartTime: z.string({
      required_error: 'Office start time is required',
    }),
    officeEndTime: z.string({
      required_error: 'Office end time is required',
    }),
  }),
});

const updateCompanyDetailsZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    type: z
      .enum([...Object.values(ENUM_COMPANY_TYPE)] as [string, ...string[]])
      .optional(),
    size: z
      .enum([...Object.values(ENUM_COMPANY_SIZE)] as [string, ...string[]])
      .optional(),
    description: z.string().optional(),
    regNumber: z.string().optional(),
    totlaEmployees: z.number().optional(),
    website: z.string().optional(),
    logo: z.string().optional(),
    officeStartTime: z.string().optional(),
    officeEndTime: z.string().optional(),
  }),
});

export const CompanyDetailsValidation = {
  addCompanyDetailsZodSchema,
  updateCompanyDetailsZodSchema,
};
