import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/Header";
import { GetProjectById } from "../../services/projectsService";
import { IProject } from "../../types/project";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProjectComments from "./ProjectComments";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<IProject | null>(null);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await GetProjectById(projectId!);
        setProject(response.data);
      } catch (error) {
        setError(`Error fetching project: ${error}`);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-lg text-gray-200">Project not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg">
      <Header />
      <br />
      <br />
      <div className="container mx-auto p-6">
        <div className="overflow-hidden">
          {project.image_urls && project.image_urls.length > 0 ? (
            <Swiper pagination={{ clickable: true }} className="w-full h-96">
              {project.image_urls.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Project ${index + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src="https://cdn.pixabay.com/photo/2021/08/05/12/36/software-development-6523979_1280.jpg"
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-purple-500 mb-4">
              {project.title}
            </h2>
            <p className="text-gray-300 mb-2">
              <strong>Description:</strong> {project.description}
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Tags:</strong>{" "}
              {Array.isArray(project.tags)
                ? project.tags.join(", ")
                : project.tags}
            </p>
            <hr className="my-10" />
            <ProjectComments />
          </div>
        </div>
      </div>
    </div>
  );
}
