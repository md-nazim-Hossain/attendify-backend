import { z } from 'zod';
import { ENUM_ACTIVITY_STATUS } from '../../enums/employeeDailyActivity.enum';

const createDailyActivityZodSchema = z.object({
  body: z.object({
    activities: z.string({
      required_error: 'Activity is required',
    }),
  }),
});

const updateDailyActivityZodSchema = z.object({
  body: z.object({
    activities: z.string().optional(),
    reason: z.string().optional(),
    status: z
      .enum(Object.values(ENUM_ACTIVITY_STATUS) as [string, ...string[]])
      .optional(),
  }),
});

export const EmployeeDailyActivityValidation = {
  createDailyActivityZodSchema,
  updateDailyActivityZodSchema,
};
