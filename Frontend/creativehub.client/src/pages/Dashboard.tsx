import { useEffect, useState } from "react";
import { GetProjectsByUser } from "../services/projectsService";
import { IProject } from "../types/project";
import { useNavigate } from "react-router-dom";
import { GetUserById } from "../services/usersService";
import { GetCommentsByUser } from "../services/commentsService";
import Header from "../layouts/Header";
import { GetViewsByUser } from "../services/viewsService";

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [viewsCount, setViewsCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userResponse = await GetUserById(userId!);
        const { name } = userResponse.data;
        setUser({ name });

        const projectsResponse = await GetProjectsByUser(userId!);
        setProjects(projectsResponse.data);
        setProjectsCount(projectsResponse.data.length);

        const viewsResponse = await GetViewsByUser(userId!);
        setViewsCount(viewsResponse.data.length);

        const commentsResponse = await GetCommentsByUser(userId!);
        setCommentsCount(commentsResponse.data.length);
      } catch (error) {
        setError(`Failed to load data: ${error}`);
      }
    };

    fetchProjects();
  }, [userId]);

  return (
    <>
      <Header />
      <br />
      <div className="overflow-hidden max-h-screen bg-gray-900 text-gray-200">
        <main className="pt-16 max-h-screen overflow-auto">
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800 rounded-3xl p-8 mb-5 border border-gray-700 shadow-lg shadow-gray-900">
                <h1 className="text-3xl font-bold mb-10 text-gray-200">
                  Your Dashboard
                </h1>
                {error && <p className="text-red-500">{error}</p>}
                <hr className="my-10 border-gray-700" />

                <div className="grid grid-cols-2 gap-x-10">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-200">
                      Stats
                    </h2>
                    <div className="p-6 bg-gray-800 border border-gray-700 rounded-2xl shadow-lg">
                      <div className="text-xl font-semibold text-gray-100 ms-1">
                        Good day, {user?.name}
                      </div>

                      <div className="mt-6">
                        <button
                          type="button"
                          className="w-full py-3 px-5 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition shadow-md"
                          onClick={() => navigate("/MyProjects")}
                        >
                          Start Tracking
                        </button>
                      </div>

                      <div className="mt-6 p-5 bg-gray-700 border border-gray-600 rounded-xl text-gray-200">
                        <h3 className="text-lg font-semibold text-center mb-4">
                          Project Overview
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total Projects:</span>
                            <span className="text-xl font-bold">
                              {projectsCount}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total Views:</span>
                            <span className="text-xl font-bold">
                              {viewsCount}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total Likes:</span>
                            <span className="text-xl font-bold">
                              {projectsCount} (TODO)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">
                              Total Comments Made:
                            </span>
                            <span className="text-xl font-bold">
                              {commentsCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-200">
                      Your Projects
                    </h2>
                    <div className="space-y-4 h-96 overflow-y-auto border border-gray-700 rounded-xl p-5 bg-gray-800">
                      {Array.isArray(projects) && projects.length > 0 ? (
                        projects.map((project, index) => (
                          <div
                            key={project.id || index}
                            className="p-5 bg-gray-700 border border-gray-700 rounded-xl shadow-md hover:shadow-lg transition"
                          >
                            <div className="flex justify-between text-sm text-gray-400">
                              <span>Project #{index + 1}</span>
                              <span>{project.title}</span>
                            </div>
                            <a
                              href="/"
                              className="block font-semibold text-gray-200 hover:text-purple-400 hover:underline transition"
                            >
                              {project.description}
                            </a>
                            <div className="text-sm text-gray-400">
                              {Array.isArray(project.tags)
                                ? project.tags.join(", ")
                                : project.tags}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No projects found.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
