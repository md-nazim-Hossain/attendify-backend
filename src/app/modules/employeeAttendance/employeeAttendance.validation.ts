import { z } from 'zod';

const checkInZodSchema = z.object({
  body: z.object({
    checkInLocation: z.string({
      required_error: 'employeeId is required',
    }),
  }),
});

const checkOutZodSchema = z.object({
  body: z.object({
    checkOutLocation: z.string({
      required_error: 'employeeId is required',
    }),
  }),
});

export const EmployeeAttendanceValidation = {
  checkInZodSchema,
  checkOutZodSchema,
};
