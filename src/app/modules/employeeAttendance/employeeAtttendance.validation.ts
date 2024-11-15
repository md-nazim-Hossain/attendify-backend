import { z } from 'zod';

const employeeAttendanceCheckInZodSchema = z.object({
  body: z.object({
    checkInLocation: z.string({
      required_error: 'Location is required',
    }),
  }),
});

const employeeAttendanceCheckOutZodSchema = z.object({
  body: z.object({
    checkOutLocation: z.string({
      required_error: 'Location is required',
    }),
  }),
});

export const EmployeeAttendanceValidation = {
  employeeAttendanceCheckInZodSchema,
  employeeAttendanceCheckOutZodSchema,
};
