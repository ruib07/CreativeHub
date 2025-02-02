import { useEffect, useState } from "react";
import UserProfileHeader from "../../layouts/ProfileHeader";
import { IProject } from "../../types/project";
import { useNavigate } from "react-router-dom";
import { GetProjectsByUser } from "../../services/projectsService";

export default function UserProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const userId = localStorage.getItem("id");
      if (!userId) {
        setError("User ID not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const projectsResponse = await GetProjectsByUser(userId);
        setProjects(projectsResponse.data);
      } catch (error) {
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: string) => {
    navigate(`/Project/${encodeURIComponent(projectId)}`);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-200">Loading your projects...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <UserProfileHeader />
      <div className="mt-[80px] p-8">
        <h2 className="text-2xl font-bold text-purple-500 mb-6 text-center">
          My Projects
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
                  src={project.image_urls[0]}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-200">
                  {project.title}
                </h3>
                <p className="text-gray-400 mt-2">{project.description}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Tags:{" "}
                  {Array.isArray(project.tags)
                    ? project.tags.join(", ")
                    : project.tags}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-200 col-span-full">
              You have no projects.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
