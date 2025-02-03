import apiRequest from "./helpers/apiService";
import { IProject } from "../types/project";

export const GetAllProjects = async () => apiRequest("GET", "projects");

export const GetProjectById = async (projectId: string) =>
  await apiRequest("GET", `projects/${projectId}`);

export const GetProjectsByUser = async (userId: string) =>
  await apiRequest("GET", `projects/byUser/${userId}`);

export const CreateProject = async (newProject: IProject) =>
  await apiRequest("POST", "projects", newProject);

export const UpdateProject = async (
  projectId: string,
  newProjectData: Partial<IProject>
) => {
  await apiRequest("PUT", `projects/${projectId}`, newProjectData);
};

export const DeleteProject = async (projectId: string) =>
  await apiRequest("DELETE", `projects/${projectId}`);
