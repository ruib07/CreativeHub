export interface IProject {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  image_urls: string[];
  category_id: string;
  user_id: string;
}
