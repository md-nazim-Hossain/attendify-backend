import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'employeeId is required',
      })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({
        required_error: 'password is required',
      })
      .min(6, {
        message: 'Password must be at least 6 characters',
      }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required',
    }),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z
      .string({
        required_error: 'New password is required',
      })
      .min(6, {
        message: 'Password must be at least 6 characters',
      }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
