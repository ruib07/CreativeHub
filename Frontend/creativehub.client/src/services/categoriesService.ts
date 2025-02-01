import { ICategory } from "../types/category";
import apiRequest from "./helpers/apiService";

export const GetCategories = async () => apiRequest("GET", "categories");

export const CreateCategory = async (newCategory: ICategory) =>
  apiRequest("POST", "categories", newCategory);
