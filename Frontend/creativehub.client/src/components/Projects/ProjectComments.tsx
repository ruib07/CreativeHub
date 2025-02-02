import { useEffect, useState } from "react";
import { IComment } from "../../types/comment";
import {
  CreateComment,
  GetCommentsByProject,
} from "../../services/commentsService";
import { useParams } from "react-router-dom";
import { GetUserById } from "../../services/usersService";

export default function ProjectComments() {
  const { projectId } = useParams<{ projectId: string }>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [newComment, setNewComment] = useState("");
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await GetCommentsByProject(projectId!);
        setComments(commentsResponse.data || []);
      } catch (error) {
        setError("Failed to load comments");
      }
    };

    fetchComments();
  }, [projectId]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const newNames: { [key: string]: string } = {};

      for (const comment of comments) {
        try {
          const userResponse = await GetUserById(comment.user_id);
          newNames[comment.user_id] = userResponse?.data?.name || "Unknown";
        } catch {
          newNames[comment.user_id] = "Unknown";
        }
      }

      setUserNames(newNames);
    };

    if (comments.length > 0) {
      fetchUserNames();
    }
  }, [comments]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const userId = localStorage.getItem("id");

    try {
      const newCommentData: IComment = {
        comment: newComment,
        user_id: userId!,
        project_id: projectId!,
        created_at: new Date().toISOString(),
      };

      await CreateComment(newCommentData);

      setNewComment("");

      const commentsResponse = await GetCommentsByProject(projectId!);
      setComments(commentsResponse.data || []);
    } catch (error) {
      setError("Failed to add comment");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-purple-500 mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-md">
            <h4 className="font-bold text-gray-200">
              {userNames[comment.user_id] || "Unknown User"}
            </h4>
            <p className="text-gray-300">{comment.comment}</p>
            <small className="text-gray-400">
              {new Date(comment.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <textarea
          className="w-full px-4 py-2 border border-gray-500 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:border-purple-400 transition"
          rows={4}
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="bg-purple-500 text-gray-200 py-2 px-4 rounded-md mt-2 hover:bg-purple-600 transition duration-200"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
