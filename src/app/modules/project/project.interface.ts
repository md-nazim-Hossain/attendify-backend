import { Model, Schema } from 'mongoose';
import { IEmployee } from '../employee/employee.interface';
import { ITeam } from '../team/team.interface';
import {
  ENUM_PROJECT_STATUS,
  ENUM_TEAM_STATUS,
} from '../../enums/project.enum';

export interface IProject {
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

export interface IProjectFilters {
  searchTerm?: string;
  name?: string;
  status?: ENUM_PROJECT_STATUS;
  startDate?: string;
  endDate?: string;
  deliveryDate?: string;
}

export type IPojectModel = Model<IProject, Record<string, unknown>>;
