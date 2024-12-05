import { z } from 'zod';
import {
  ENUM_EMPLOYEE_ROLE,
  ENUM_EMPLOYEE_STATUS,
} from '../../enums/employee.enum';

const addEmployeeZodSchema = z.object({
  body: z.object({
    employeeId: z.string({
      required_error: 'employeeId is required',
    }),
    company: z.string({
      required_error: 'company is required',
    }),
    employeeEmail: z
      .string({
        required_error: 'Employee email is required',
      })
      .email({ message: 'Invalid email address' }),
    address: z.string().optional(),
    designation: z.string({
      required_error: 'designation is required',
    }),
    phone: z.string().optional(),
    role: z.enum(Object.values(ENUM_EMPLOYEE_ROLE) as [string, ...string[]], {
      required_error: 'role is required',
    }),
  }),
});

const updateEmployeeZodSchema = z.object({
  body: z.object({
    employeeEmail: z.string().optional(),
    address: z.string().optional(),
    designation: z.string().optional(),
    phone: z.string().optional(),
    role: z
      .enum(Object.values(ENUM_EMPLOYEE_ROLE) as [string, ...string[]])
      .optional(),
  }),
});

const updateEmployeeStatusZodSchema = z.object({
  body: z.object({
    status: z.enum(
      Object.values(ENUM_EMPLOYEE_STATUS) as [string, ...string[]],
      {
        required_error: 'status is required',
      }
    ),
  }),
});

const employeeAcceptedInvitationZodSchema = z.object({
  body: z.object({
    employeeId: z.string({
      required_error: 'employeeId is required',
    }),
    companyId: z.string({
      required_error: 'companyId is required',
    }),
  }),
});

export const EmployeeValidation = {
  addEmployeeZodSchema,
  updateEmployeeZodSchema,
  updateEmployeeStatusZodSchema,
  employeeAcceptedInvitationZodSchema,
};
