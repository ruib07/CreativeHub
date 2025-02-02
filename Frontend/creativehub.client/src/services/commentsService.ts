import { IComment } from "../types/comment";
import apiRequest from "./helpers/apiService";

export const GetCommentsByProject = async (projectId: string) =>
  apiRequest("GET", `comments/${projectId}`);

export const GetCommentsByUser = async (userId: string) =>
  apiRequest("GET", `comments/byUser/${userId}`);

export const CreateComment = async (newComment: IComment) =>
  apiRequest("POST", "comments", newComment);
