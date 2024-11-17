import { z } from 'zod';
import { ENUM_TEAM_DESIGNATIONS } from '../../enums/team.enum';

const addTeamZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Team name is required',
    }),
    teamLead: z.string({
      required_error: 'Team leader is required',
    }),
    designations: z
      .array(
        z.enum(Object.values(ENUM_TEAM_DESIGNATIONS) as [string, ...string[]])
      )
      .min(1, { message: 'Designation is required' }),
  }),
});

const updateTeamZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    teamLead: z.string().optional(),
    designations: z
      .array(
        z.enum(Object.values(ENUM_TEAM_DESIGNATIONS) as [string, ...string[]])
      )
      .optional(),
  }),
});

const updateTeamStatusZodSchema = z.object({
  body: z.object({
    status: z.boolean({
      required_error: 'status is required',
    }),
  }),
});

export const TeamValidation = {
  addTeamZodSchema,
  updateTeamZodSchema,
  updateTeamStatusZodSchema,
};
