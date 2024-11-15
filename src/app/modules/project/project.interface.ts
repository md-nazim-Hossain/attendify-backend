import { Model, Schema } from 'mongoose';
import { IEmployee } from '../employee/employee.interface';
import { ITeam } from '../team/team.interface';
import {
  ENUM_PROJECT_STATUS,
  ENUM_TEAM_STATUS,
} from '../../enums/project.enum';

export interface IPoject {
  name: string;
  description: string;
  technologyUsed: Array<string>;
  clientName: string;
  clientPhone?: string;
  projectManager?: Schema.Types.ObjectId | IEmployee;
  startDate: string;
  endDate: string;
  deliveryDate?: string;
  teamIds?: Array<Schema.Types.ObjectId | ITeam>;
  teamStatus?: Array<{ _id: Schema.Types.ObjectId; status: ENUM_TEAM_STATUS }>;
  status: ENUM_PROJECT_STATUS;
  createdAt: string;
  updatedAt: string;
}

export type IPojectModel = Model<IPoject, Record<string, unknown>>;
