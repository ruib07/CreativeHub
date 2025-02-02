import { useEffect, useState } from "react";
import { IProject } from "../../types/project";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import { GetAllProjects } from "../../services/projectsService";
import ProjectSearchBar from "../Search/ProjectSearchBar";
import { CreateView } from "../../services/viewsService";

export default function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await GetAllProjects();
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        setError("Failed to load projects");
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = async (projectId: string) => {
    const userId = localStorage.getItem("id") || undefined;

    try {
      await CreateView({ user_id: userId, project_id: projectId });
      navigate(`/Project/${encodeURIComponent(projectId)}`);
    } catch (error) {
      setError("Failed to insert view!");
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <>
      <Header />
      <br />
      <br />
      <div className="flex flex-col items-center p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">
          Projects
        </h1>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <ProjectSearchBar
          projects={projects}
          setFilteredProjects={setFilteredProjects}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-8xl">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleProjectClick(project.id!)}
              className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer bg-gray-800 transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-500"
            >
              <img
                className="w-full"
                src={
                  project.image_urls?.[0] ||
                  "https://st4.depositphotos.com/12981370/20592/i/450/depositphotos_205925330-stock-photo-start-partners-working-casual-clothes.jpg"
                }
                alt="ProjectImage"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-200">
                  {project.title}
                </div>
                <p className="text-gray-400 text-base">{project.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  {Array.isArray(project.tags)
                    ? project.tags.join(", ")
                    : project.tags}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-purple-500 rounded-l-md hover:bg-purple-600 disabled:bg-gray-400"
          >
            &lt;
          </button>
          <span className="px-4 py-2 text-white bg-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-purple-500 rounded-r-md hover:bg-purple-600 disabled:bg-gray-400"
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}
