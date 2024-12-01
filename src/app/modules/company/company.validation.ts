import { z } from 'zod';
import { ENUM_COMPANY_SIZE, ENUM_COMPANY_TYPE } from '../../enums/company.enum';

const createCompanyZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    phone: z.string().optional(),
    address: z.string({
      required_error: 'Address is required',
    }),
    type: z.enum(
      [...Object.values(ENUM_COMPANY_TYPE)] as [string, ...string[]],
      {
        required_error: 'Type is required',
      }
    ),
    size: z.enum(
      [...Object.values(ENUM_COMPANY_SIZE)] as [string, ...string[]],
      {
        required_error: 'Size is required',
      }
    ),
    description: z.string().optional(),
    regNumber: z.string().optional(),
    totlaEmployees: z.number().optional(),
    domain: z
      .string({
        required_error: 'Domain is required',
      })
      .startsWith('https://', {
        message: 'Domain must start with https://',
      }),
    website: z.string().optional(),
    logo: z.string().optional(),
  }),
});

export const CompanyValidation = {
  createCompanyZodSchema,
};
