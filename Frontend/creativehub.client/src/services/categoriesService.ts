import { ICategory } from "../types/category";
import apiRequest from "./helpers/apiService";

export const GetCategories = async () => await apiRequest("GET", "categories");

export const CreateCategory = async (newCategory: ICategory) =>
  await apiRequest("POST", "categories", newCategory);
