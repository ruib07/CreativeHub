import { IView } from "../types/view";
import apiRequest from "./helpers/apiService";

export const GetViewsByProject = async (projectId: string) =>
  await apiRequest("GET", `views/${projectId}`);

export const CreateView = async (newView: IView) =>
  await apiRequest("POST", "views", newView);
