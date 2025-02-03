export interface IComment {
  id?: string;
  comment: string;
  user_id: string;
  project_id: string;
  created_at: string;
}

export interface IDeleteProjectComment {
  commentId: string;
  onClose: () => void;
  onConfirm: () => void;
}
