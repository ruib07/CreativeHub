import { IComment } from "../types/comment";
import apiRequest from "./helpers/apiService";

export const GetCommentsByProject = async (projectId: string) =>
  await apiRequest("GET", `comments/${projectId}`);

export const GetCommentsByUser = async (userId: string) =>
  await apiRequest("GET", `comments/byUser/${userId}`);

export const CreateComment = async (newComment: IComment) =>
  await apiRequest("POST", "comments", newComment);

export const DeleteComment = async (commentId: string) =>
  await apiRequest("DELETE", `comments/${commentId}`);
