import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../../layouts/ProfileHeader";
import { ILike } from "../../types/like";
import { GetLikesByUser } from "../../services/likesService";
import { GetProjectById } from "../../services/projectsService";
import { IProject } from "../../types/project";

export default function UserProjectLikes() {
  const [, setLikes] = useState<ILike[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikes = async () => {
      const userId = localStorage.getItem("id");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const likesResponse = await GetLikesByUser(userId);
        const userLikes = likesResponse.data;
        setLikes(userLikes);

        const projectPromises = userLikes.map((like: any) =>
          GetProjectById(like.project_id)
        );
        const projectsResponses = await Promise.all(projectPromises);

        const projectsData = projectsResponses.map((response) => response.data);
        setProjects(projectsData);
      } catch (error) {
        setError("Failed to fetch likes.");
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, []);

  const handleProjectClick = (projectId: string) => {
    navigate(`/Project/${encodeURIComponent(projectId)}`);
  };

  if (loading) {
    return <p className="text-center text-gray-200">Loading your likes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <ProfileHeader />
      <div className="mt-[80px] p-8">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
          My Likes on Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id!)}
                className="shadow-md rounded-lg p-4 max-w-sm overflow-hidden shadow-lg cursor-pointer bg-gray-800 transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-500"
              >
                <img
                  src={project.image_urls?.[0]}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-200">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {project.tags?.join(", ")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-200 col-span-full">
              You have no liked projects.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
