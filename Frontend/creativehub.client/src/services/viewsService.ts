import { IView } from "../types/view";
import apiRequest from "./helpers/apiService";

export const GetViewsByUser = async (userId: string) =>
  await apiRequest("GET", `views/byUser/${userId}`);

export const GetViewsByProject = async (projectId: string) =>
  await apiRequest("GET", `views/${projectId}`);

export const CreateView = async (newView: IView) =>
  await apiRequest("POST", "views", newView);
