import { z } from 'zod';
import {
  ENUM_EMPLOYEE_GENDER,
  ENUM_EMPLOYEE_ROLE,
} from '../../enums/employee.enum';

const addEmployeeZodSchema = z.object({
  body: z.object({
    employeeId: z.string({
      required_error: 'employeeId is required',
    }),
    fullName: z.string({
      required_error: 'fullName is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    address: z.string().optional(),
    designation: z.string({
      required_error: 'designation is required',
    }),
    photo: z.any().optional(),
    team: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum(Object.values(ENUM_EMPLOYEE_ROLE) as [string, ...string[]], {
      required_error: 'role is required',
    }),
    password: z
      .string({
        required_error: 'password is required',
      })
      .min(6, {
        message: 'password must be at least 6 characters',
      }),
    gender: z
      .enum(Object.values(ENUM_EMPLOYEE_GENDER) as [string, ...string[]])
      .optional(),
  }),
});

const updateEmployeeZodSchema = z.object({
  body: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    designation: z.string().optional(),
    team: z.string().optional(),
    phone: z.string().optional(),
    photo: z.string().optional(),
    role: z
      .enum(Object.values(ENUM_EMPLOYEE_ROLE) as [string, ...string[]])
      .optional(),
    gender: z
      .enum(Object.values(ENUM_EMPLOYEE_GENDER) as [string, ...string[]])
      .optional(),
  }),
});

const updateEmployeeStatusZodSchema = z.object({
  body: z.object({
    status: z.boolean({
      required_error: 'status is required',
    }),
  }),
});

export const EmployeeValidation = {
  addEmployeeZodSchema,
  updateEmployeeZodSchema,
  updateEmployeeStatusZodSchema,
};
