import { Model, Schema } from 'mongoose';
import { IEmployee } from '../employee/employee.interface';
import { ENUM_TEAM_DESIGNATIONS } from '../../enums/team.enum';

export interface ITeam {
  _id: Schema.Types.ObjectId;
  name: string;
  designations: Array<ENUM_TEAM_DESIGNATIONS>;
  teamLead: Schema.Types.ObjectId | IEmployee;
  status: boolean;
}

export type ITeamModel = Model<ITeam, Record<string, unknown>>;
