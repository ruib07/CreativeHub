import { ICategory } from "./category";
import { IProject } from "./project";

export interface ICategorySearchBar {
  categories: ICategory[];
  setFilteredCategories: (categories: ICategory[]) => void;
}

export interface IProjectSearchBar {
  projects: IProject[];
  setFilteredProjects: (projects: IProject[]) => void;
}
