import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interface/common';
import { IProject, IProjectFilters } from './project.interface';
import { Project } from './project.model';
import { ProjectConstant } from './projects.constant';

const addProject = async (payload: IProject): Promise<void> => {
  await Project.create(payload);
};

const getAllProjects = async (
  filters: IProjectFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IProject[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: ProjectConstant.projectsSearchFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
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

  const result = await Project.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getProjectById = async (id: string): Promise<IProject | null> => {
  const result = await Project.findById(id);
  return result;
};

const updateProject = async (
  id: string,
  payload: Partial<IProject>
): Promise<void> => {
  await Project.findOneAndUpdate({ _id: id }, payload);
};

const deleteProject = async (id: string): Promise<void> => {
  await Project.findOneAndDelete({ _id: id });
};

export const ProjectService = {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
