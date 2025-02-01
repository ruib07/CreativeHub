import axios from "axios";
import { GetAuthHeaders } from "./helpers/getAuthHeaders";
import { IProject } from "../types/project";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const headers = GetAuthHeaders();

export const GetProjectsByUser = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API_VERSION}/projects/byUser/${userId}`,
      {
        headers,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to get projects by user!");
  }
};

export const CreateProject = async (newProject: IProject) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API_VERSION}/projects`,
      newProject,
      {
        headers,
      }
    );

    return response;
  } catch (error) {
    throw new Error("Failed to create project!");
  }
};
