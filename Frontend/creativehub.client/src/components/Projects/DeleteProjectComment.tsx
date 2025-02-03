import { IDeleteProjectComment } from "../../types/comment";
import { DeleteComment } from "../../services/commentsService";
import { showToast } from "../../utils/toastHelper";

export default function RemoveProjectComment({
  commentId,
  onClose,
  onConfirm,
}: IDeleteProjectComment) {
  const handleDelete = () => {
    try {
      DeleteComment(commentId);
      onConfirm();
      showToast("Comment removed successfully!", "success");
      onClose();
    } catch (error) {
      showToast("Comment remotion failed!", "error");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-200 text-center">
          Are you sure that you want to delete this comment?
        </h2>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
