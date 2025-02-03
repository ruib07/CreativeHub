import { ILike } from "../types/like";
import apiRequest from "./helpers/apiService";

export const GetLikesByUser = async (userId: string) =>
  await apiRequest("GET", `likes/byUser/${userId}`);

export const GetLikesByProject = async (projectId: string) =>
  await apiRequest("GET", `likes/byProject/${projectId}`);

export const CreateLike = async (newLike: ILike) =>
  await apiRequest("POST", "likes", newLike);

export const DeleteLike = async (likeId: string) =>
  await apiRequest("DELETE", `likes/${likeId}`);
