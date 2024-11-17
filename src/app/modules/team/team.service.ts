import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { ITeam, ITeamFilters } from './team.interface';
import { Team } from './team.model';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/common';
import { TeamConstant } from './team.constant';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const addTeam = async (payload: ITeam): Promise<void> => {
  await Team.create(payload);
};

const getAllTeams = async (
  filters: ITeamFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<ITeam[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: TeamConstant.teamSearchFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Team.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Team.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getTeamById = async (teamId: string): Promise<ITeam | null> => {
  const result = await Team.findById(teamId);
  return result;
};

const getMyTeam = async (employeeId: string): Promise<ITeam[]> => {
  const result = await Team.find({ designations: { $in: [employeeId] } });
  return result;
};

const updateTeam = async (
  teamId: string,
  payload: Partial<ITeam>
): Promise<void> => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Team not found');
  }
  await Team.findOneAndUpdate({ _id: teamId }, payload);
};

const updateTeamStatus = async (
  teamId: string,
  status: boolean
): Promise<void> => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Team not found');
  }
  await Team.findOneAndUpdate({ _id: teamId }, { status });
};

const deleteTeam = async (teamId: string): Promise<void> => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Team not found');
  }
  await Team.findByIdAndDelete(teamId);
};

export const TeamService = {
  addTeam,
  updateTeam,
  updateTeamStatus,
  deleteTeam,
  getAllTeams,
  getTeamById,
  getMyTeam,
};
