import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetProjectById, UpdateProject } from "../../services/projectsService";
import { IProject } from "../../types/project";
import UserProfileHeader from "../../layouts/ProfileHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function EditProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState<IProject | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IProject>>({
    title: "",
    description: "",
    tags: [],
    image_urls: [""],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await GetProjectById(projectId!);
        setProject(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          tags: Array.isArray(response.data.tags) ? response.data.tags : [],
          image_urls: response.data.image_urls || [""],
        });
      } catch (error) {
        setError(`Failed to fetch project: ${error}`);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    });
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData({
      title: project?.title || "",
      description: project?.description || "",
      tags: Array.isArray(project?.tags) ? project?.tags : [],
      image_urls: project?.image_urls || [""],
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await UpdateProject(projectId!, {
        ...formData,
        tags: formData.tags,
      });

      setProject({
        ...project!,
        ...formData,
      });

      setIsEditing(false);
      navigate(`/Projects/${projectId}`);
    } catch (error) {
      alert("Failed to update project.");
    }
  };

  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      image_urls: [...(prev.image_urls || []), ""],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      image_urls: prev.image_urls?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...(formData.image_urls || [])];
    updatedImages[index] = value;
    setFormData((prev) => ({ ...prev, image_urls: updatedImages }));
  };

  return (
    <>
      <UserProfileHeader />
      <div className="flex items-start justify-center mt-[120px]">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-purple-500 mb-6 text-center">
            Edit Project
          </h2>

          {project ? (
            <div>
              <div className="flex flex-col items-center space-y-6">
                {formData.image_urls && formData.image_urls.length > 0 ? (
                  <Swiper
                    pagination={{ clickable: true }}
                    className="w-full h-64"
                  >
                    {formData.image_urls.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image || "https://via.placeholder.com/300"}
                          alt={`Project ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg border border-gray-500"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img
                    src="https://via.placeholder.com/300"
                    alt="Project"
                    className="w-full h-48 object-cover rounded-lg border border-gray-500"
                  />
                )}

                {/* Campos de URL das imagens */}
                {isEditing &&
                  formData.image_urls?.map((image, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center space-x-2"
                    >
                      <input
                        type="text"
                        value={image}
                        onChange={(e) =>
                          handleImageChange(index, e.target.value)
                        }
                        className="flex-1 p-2 border bg-gray-800 text-gray-200 rounded-md border-purple-500"
                        placeholder="Image URL"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                {isEditing && (
                  <button
                    onClick={handleAddImage}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mt-3"
                  >
                    + Add Image
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 mt-6">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border bg-gray-800 text-gray-200 rounded-md ${
                    isEditing
                      ? "border-purple-500 focus:border-purple-600"
                      : "border-gray-500"
                  }`}
                  placeholder="Project Title"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border bg-gray-800 text-gray-200 rounded-md ${
                    isEditing
                      ? "border-purple-500 focus:border-purple-600"
                      : "border-gray-500"
                  }`}
                  rows={4}
                  placeholder="Project Description"
                />

                <input
                  type="text"
                  name="tags"
                  value={formData.tags?.join(", ")}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-2 border bg-gray-800 text-gray-200 rounded-md ${
                    isEditing
                      ? "border-purple-500 focus:border-purple-600"
                      : "border-gray-500"
                  }`}
                  placeholder="Tags (comma separated)"
                />
              </div>

              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="w-full bg-purple-500 text-gray-200 py-2 rounded-md hover:bg-purple-600 transition mt-6"
                >
                  Edit Project
                </button>
              ) : (
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-purple-500 text-gray-200 py-2 rounded-md hover:bg-purple-600 transition"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading project...</p>
          )}
        </div>
      </div>
    </>
  );
}
