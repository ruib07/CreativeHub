import { useEffect, useState } from "react";
import UserProfileHeader from "../../layouts/ProfileHeader";
import { IProject } from "../../types/project";
import { useNavigate } from "react-router-dom";
import { GetProjectsByUser } from "../../services/projectsService";
import RemoveProject from "../Projects/DeleteProject";

export default function UserProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [expandedDescription, setExpandedDescription] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const userId = localStorage.getItem("id");
      if (!userId) {
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

  const handleEdit = (projectId: string) => {
    navigate(`/Project/Update/${encodeURIComponent(projectId)}`);
  };

  const handleDelete = () => {
    setTimeout(() => {
      window.location.reload();
    }, 6000);
  };

  const handleToggleDescription = (projectId: string) => {
    setExpandedDescription((prev) => (prev === projectId ? null : projectId));
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
        <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">
          My Projects
        </h2>

        {projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700">
              <thead>
                <tr className="bg-gray-900 text-gray-300">
                  <th className="py-3 px-2 text-left">Projects</th>
                  <th className="py-3 px-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-t border-gray-700">
                    <td className="p-2 cursor-pointer hover:bg-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.image_urls[0]}
                          alt={project.title}
                          className="w-14 h-14 object-cover rounded-md"
                        />
                        <div>
                          <h3
                            className="text-base font-semibold text-gray-200 hover:text-purple-500 hover:underline"
                            onClick={() =>
                              navigate(
                                `/Project/${encodeURIComponent(project.id!)}`
                              )
                            }
                          >
                            {project.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {expandedDescription === project.id
                              ? project.description
                              : `${project.description.substring(0, 140)}...`}
                          </p>
                          <button
                            className="text-purple-400 text-xs mt-2"
                            onClick={() => handleToggleDescription(project.id!)}
                          >
                            {expandedDescription === project.id
                              ? "Show less"
                              : "Show more"}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleEdit(project.id!)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 text-sm"
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(project.id!)}
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
                      {showDeleteModal === project.id && (
                        <RemoveProject
                          projectId={project.id!}
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
