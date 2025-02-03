import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layouts/Header";
import { GetProjectById } from "../../services/projectsService";
import { IProject } from "../../types/project";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProjectComments from "./ProjectComments";
import {
  CreateLike,
  DeleteLike,
  GetLikesByProject,
} from "../../services/likesService";
import { ILike } from "../../types/like";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<IProject | null>(null);
  const [liked, setLiked] = useState(false);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectResponse = await GetProjectById(projectId!);
        setProject(projectResponse.data);

        const likesResponse = await GetLikesByProject(projectId!);
        if (
          likesResponse.data.some(
            (like: ILike) => like.user_id === localStorage.getItem("id")
          )
        ) {
          setLiked(true);
        }
      } catch (error) {
        setError(`Error fetching project: ${error}`);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleLike = async () => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      setError("You must be logged in to like a project.");
      return;
    }

    if (liked) {
      try {
        const likeToRemove = (await GetLikesByProject(projectId!)).data.find(
          (like: ILike) => like.user_id === userId
        );
        if (likeToRemove) {
          await DeleteLike(likeToRemove.id);
          setLiked(false);
        }
      } catch (error) {
        setError("Error removing like.");
      }
    } else {
      try {
        const newLike: ILike = {
          user_id: userId!,
          project_id: projectId!,
        };
        await CreateLike(newLike);
        setLiked(true);
      } catch (error) {
        setError("Error adding like.");
      }
    }
  };

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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-purple-500 mb-4">
                {project.title}
              </h2>
              <button
                onClick={handleLike}
                className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={liked ? "red" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke={liked ? "red" : "currentColor"}
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-300 mb-2">
              <strong>Description:</strong> {project.description}
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Tags:</strong> {project.tags.join(", ")}
            </p>
            <hr className="my-10" />
            <ProjectComments />
          </div>
        </div>
      </div>
    </div>
  );
}
