import { z } from 'zod';

const createCompanyZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    domain: z
      .string({
        required_error: 'Domain is required',
      })
      .startsWith('https://', {
        message: 'Domain must start with https://',
      }),
  }),
});

const updateCompanyZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    domain: z.string().optional(),
  }),
});

export const CompanyValidation = {
  createCompanyZodSchema,
  updateCompanyZodSchema,
};
