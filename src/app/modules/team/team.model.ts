import { model, Schema } from 'mongoose';
import { ITeam, ITeamModel } from './team.interface';

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    designations: {
      type: [String],
      required: true,
    },
    teamLead: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Team = model<ITeam, ITeamModel>('Team', teamSchema);
