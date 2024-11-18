import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProjectService } from './project.service';
import { IProject } from './project.interface';
import { IPaginationOptions } from '../../../interface/common';
import pick from '../../../shared/pick';
import { ProjectConstant } from './projects.constant';
import { paginationFields } from '../../constant/paginationConstant';

const addProject = catchAsync(async (req, res) => {
  const { ...projectData } = req.body;
  await ProjectService.addProject(projectData);
  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project created successfully',
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const filters = pick(req.query, ProjectConstant.projectFilterableFields);
  const pagination: IPaginationOptions = pick(req.query, paginationFields);
  const result = await ProjectService.getAllProjects(filters, pagination);
  sendResponse<IProject[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Projects fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getProjectById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectService.getProjectById(id);
  sendResponse<IProject>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project fetched successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...projectData } = req.body;
  await ProjectService.updateProject(id, projectData);
  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project updated successfully',
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ProjectService.deleteProject(id);
  sendResponse<null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project deleted successfully',
  });
});

export const ProjectController = {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
