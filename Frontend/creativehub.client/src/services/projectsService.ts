import apiRequest from "./helpers/apiService";
import { IProject } from "../types/project";

export const GetAllProjects = async () => apiRequest("GET", "projects");

export const GetProjectsByUser = async (userId: string) =>
  apiRequest("GET", `projects/byUser/${userId}`);

export const CreateProject = async (newProject: IProject) =>
  apiRequest("POST", "projects", newProject);
