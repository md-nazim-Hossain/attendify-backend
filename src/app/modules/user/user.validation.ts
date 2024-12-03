import { z } from 'zod';
import { ENUM_USER_GENDER, ENUM_USER_STATUS } from '../../enums/user.enum';

const signUpZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }).min(6, {
      message: 'Password must be at least 6 characters',
    }),
    photo: z.any().optional(),
    gender: z
      .enum(Object.values(ENUM_USER_GENDER) as [string, ...string[]], {
        required_error: 'Gender is required',
      })
      .optional(),
    dob: z.string().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    photo: z.any().optional(),
    gender: z
      .enum(Object.values(ENUM_USER_GENDER) as [string, ...string[]])
      .optional(),
    dob: z.string().optional(),
  }),
});

const updateUserStatusZodSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(ENUM_USER_STATUS) as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});

export const UserValidation = {
  signUpZodSchema,
  updateUserZodSchema,
  updateUserStatusZodSchema,
};