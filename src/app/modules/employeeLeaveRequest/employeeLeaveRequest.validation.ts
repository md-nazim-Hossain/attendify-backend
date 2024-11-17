import { z } from 'zod';
import { ENUM_LEAVE_TYPE } from '../../enums/employeeLeaveRequest.enum';

const addLeaveRequestZodSchema = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'startDate is required',
    }),
    endDate: z
      .string({
        required_error: 'endDate is required',
      })
      .refine(
        (value) => {
          const startDate = new Date(value);
          const endDate = new Date(value);
          endDate.setDate(endDate.getDate() + 1);
          return startDate < endDate;
        },
        {
          message: 'endDate must be greater than startDate',
        }
      ),
    reason: z.string({
      required_error: 'reason is required',
    }),
    leaveType: z.enum(Object.values(ENUM_LEAVE_TYPE) as [string, ...string[]], {
      required_error: 'leaveType is required',
    }),
  }),
});

const updateLeaveRequestZodSchema = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z
      .string()
      .optional()
      .refine(
        (value) => {
          const startDate = new Date(value || '');
          const endDate = new Date(value || '');
          endDate.setDate(endDate.getDate() + 1);
          return startDate < endDate;
        },
        {
          message: 'endDate must be greater than startDate',
        }
      ),
    reason: z.string().optional(),
    leaveType: z
      .enum(Object.values(ENUM_LEAVE_TYPE) as [string, ...string[]])
      .optional(),
  }),
});

const updateLeaveRequestStatusZodSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(ENUM_LEAVE_TYPE) as [string, ...string[]], {
      required_error: 'status is required',
    }),
  }),
});

export const EmployeeLeaveRequestValidation = {
  addLeaveRequestZodSchema,
  updateLeaveRequestZodSchema,
  updateLeaveRequestStatusZodSchema,
};
