import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { TeamService } from './team.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IPaginationOptions } from '../../../interface/common';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constant/paginationConstant';
import { TeamConstant } from './team.constant';
import { ITeam } from './team.interface';

const addTeam = catchAsync(async (req: Request, res: Response) => {
  const { ...teamData } = req.body;
  await TeamService.addTeam(teamData);
  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team created successfully',
  });
});

const getAllTeams = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, TeamConstant.teamFilterableFields);
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const result = await TeamService.getAllTeams(filters, pagination);
  sendResponse<ITeam[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teams fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getTeamById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TeamService.getTeamById(id);
  sendResponse<ITeam>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team fetched successfully by id',
    data: result,
  });
});

const getMyTeam = catchAsync(async (req: Request, res: Response) => {
  const employeeId = req.employee?.employeeId;
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, TeamConstant.teamFilterableFields);
  const result = await TeamService.getMyTeam(employeeId);
  sendResponse<ITeam[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My teams fetched successfully',
    data: result,
  });
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await TeamService.updateTeam(id, req.body);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team updated successfully',
  });
});

const updateTeamStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  await TeamService.updateTeamStatus(id, status);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team status updated successfully',
  });
});

const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await TeamService.deleteTeam(id);
  sendResponse<void>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Team deleted successfully',
  });
});

export const TeamController = {
  addTeam,
  getAllTeams,
  getTeamById,
  getMyTeam,
  updateTeam,
  updateTeamStatus,
  deleteTeam,
};
