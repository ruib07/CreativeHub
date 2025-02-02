import { IView } from "../types/view";
import apiRequest from "./helpers/apiService";

export const GetViewsByUser = async (userId: string) =>
  apiRequest("GET", `views/byUser/${userId}`);

export const GetViewsByProject = async (projectId: string) =>
  apiRequest("GET", `views/${projectId}`);

export const CreateView = async (newView: IView) =>
  apiRequest("POST", "views", newView);
