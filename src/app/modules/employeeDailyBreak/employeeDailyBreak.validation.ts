import { z } from 'zod';
import { ENUM_BREAK_TYPE } from '../../enums/employeeDailyBreak.enum';

const addEmployeeDailyBreakZodSchema = z.object({
  body: z.object({
    startTime: z.string({
      required_error: 'startTime is required',
    }),
    endTime: z.string({
      required_error: 'endTime is required',
    }),
    reason: z.string().optional(),
    type: z.enum(Object.values(ENUM_BREAK_TYPE) as [string, ...string[]], {
      required_error: 'type is required',
    }),
  }),
});

const updateEmployeeDailyBreakZodSchema = z.object({
  body: z.object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    reason: z.string().optional(),
    type: z
      .enum(Object.values(ENUM_BREAK_TYPE) as [string, ...string[]])
      .optional(),
  }),
});

const updateEmployeeDailyBreakStatusZodSchema = z.object({
  body: z.object({
    status: z.boolean({
      required_error: 'status is required',
    }),
  }),
});

export const EmployeeDailyBreakValidation = {
  addEmployeeDailyBreakZodSchema,
  updateEmployeeDailyBreakZodSchema,
  updateEmployeeDailyBreakStatusZodSchema,
};
