import { model, Schema } from 'mongoose';
import {
  ENUM_PROJECT_STATUS,
  ENUM_TEAM_STATUS,
} from '../../enums/project.enum';
import { IProject, IPojectModel } from './project.interface';

const projectSchema = new Schema<IProject, Record<string, unknown>>(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologyUsed: {
      type: [String],
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientPhone: {
      type: String,
    },
    projectManager: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
    },
    teamIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Team',
    },
    teamStatus: {
      type: [
        {
          _id: Schema.Types.ObjectId,
          status: {
            type: String,
            enum: Object.values(ENUM_TEAM_STATUS),
            required: true,
          },
        },
      ],
    },
    status: {
      type: String,
      enum: Object.values(ENUM_PROJECT_STATUS),
      default: ENUM_PROJECT_STATUS.IN_PROGRESS,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Project = model<IProject, IPojectModel>('Project', projectSchema);
