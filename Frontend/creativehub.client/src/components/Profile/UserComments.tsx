import { useEffect, useState } from "react";
import UserProfileHeader from "../../layouts/ProfileHeader";
import { useNavigate } from "react-router-dom";
import { IComment } from "../../types/comment";
import { GetCommentsByUser } from "../../services/commentsService";
import RemoveProjectComment from "../Projects/DeleteProjectComment";

export default function UserProjectComments() {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchComments = async () => {
      try {
        const response = await GetCommentsByUser(userId);
        setComments(response.data);
      } catch (err) {
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [userId]);

  const handleDelete = () => {
    setTimeout(() => {
      window.location.reload();
    }, 6000);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-200">Loading your comments...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <>
      <UserProfileHeader />
      <div className="mt-[80px] p-8">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
          My Comments
        </h2>

        {comments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="py-3 px-2 text-left">Comments</th>
                  <th className="py-3 px-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id} className="border-t border-gray-700">
                    <td className="p-2 cursor-pointer hover:bg-gray-700">
                      <div className="flex items-center gap-3">
                        <div>
                          <p
                            className="text-gray-300 mb-2"
                            onClick={() =>
                              navigate(
                                `/Project/${encodeURIComponent(
                                  comment.project_id
                                )}`
                              )
                            }
                          >
                            "{comment.comment}"
                          </p>
                          <p className="text-gray-400 text-sm">
                            Commented on:{" "}
                            {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => setShowDeleteModal(comment.id!)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                      {showDeleteModal === comment.id && (
                        <RemoveProjectComment
                          commentId={comment.id!}
                          onClose={() => setShowDeleteModal(null)}
                          onConfirm={handleDelete}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-200">You have no projects.</p>
        )}
      </div>
    </>
  );
}
