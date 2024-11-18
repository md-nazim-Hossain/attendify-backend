import { z } from 'zod';
import { ENUM_PROJECT_STATUS } from '../../enums/project.enum';

const addProjectZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'project name is required',
    }),
    description: z.string().optional(),
    technologyUsed: z.array(z.string()).optional(),
    clientName: z.string({
      required_error: 'client name is required',
    }),
    clientPhone: z.string().optional(),
    startDate: z.string({
      required_error: 'start date is required',
    }),
    endDate: z.string({
      required_error: 'end date is required',
    }),
    teamIds: z.array(z.string()).optional(),
    deliveryDate: z.string({
      required_error: 'delivery date is required',
    }),
    projectManager: z.string().optional(),
  }),
});

const updateProjectZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'project name is required',
    }),
    description: z.string().optional(),
    technologyUsed: z.array(z.string()).optional(),
    clientName: z.string({
      required_error: 'client name is required',
    }),
    clientPhone: z.string().optional(),
    startDate: z.string({
      required_error: 'start date is required',
    }),
    endDate: z.string({
      required_error: 'end date is required',
    }),
    teamIds: z.array(z.string()).optional(),
    deliveryDate: z.string().optional(),
    projectManager: z.string().optional(),
    status: z
      .enum(Object.values(ENUM_PROJECT_STATUS) as [string, ...string[]])
      .optional(),
    teamStatus: z.array(z.string()).optional(),
  }),
});

export const ProjectValidation = {
  addProjectZodSchema,
  updateProjectZodSchema,
};
