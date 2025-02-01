import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Img from "../../assets/CreativeHubLogo.png";
import { IProject } from "../../types/project";
import { CreateProject } from "../../services/projectsService";
import { GetCategories } from "../../services/categoriesService";

export default function NewProject() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [image_urls, setImageUrls] = useState<string[]>([]);
  const [category_id, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const showToast = (message: string, type: "success" | "error") => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetCategories();
        setCategories(response.data || []);
        setFilteredCategories(response.data || []);
      } catch (error) {
        setError(`Error fetching categories: ${error}`);
      }
    };

    fetchCategories();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("id");

    const newProject: IProject = {
      title,
      description,
      tags,
      image_urls,
      category_id,
      user_id: userId!,
    };

    try {
      await CreateProject(newProject);
      showToast("Registration completed successfully!", "success");

      setTitle("");
      setDescription("");
      setTags([""]);
      setImageUrls([""]);
      setCategoryId("");
      navigate("/");
    } catch (error) {
      showToast("Registration was not completed!", "error");
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim()));
  };

  const handleImageUrlsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrls(e.target.value.split(",").map((url) => url.trim()));
  };

  const handleCategoriesSearch = (search: string) => {
    setCategoryId(search);

    if (search) {
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="CreativeHub" src={Img} className="mx-auto h-16 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200">
            Create Project
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <div className="mt-2">
                <input
                  type="text"
                  id="Title"
                  name="Title"
                  className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <textarea
                  className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  rows={4}
                  placeholder="Description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  type="text"
                  id="Tags"
                  name="Tags"
                  className="block w-full rounded-md bg-gray-800 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  placeholder="Tags (separated by comma)"
                  value={tags.join(", ")}
                  onChange={handleTagsChange}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  type="text"
                  id="ImageUrls"
                  name="ImageUrls"
                  className="block w-full rounded-md bg-gray-800 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  placeholder="Image URLs (separated by comma)"
                  value={image_urls.join(", ")}
                  onChange={handleImageUrlsChange}
                />
              </div>
            </div>

            <div>
              <div className="mt-2 relative">
                <input
                  type="text"
                  className="block w-full rounded-md bg-gray-800 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  placeholder="Search for category"
                  required
                  value={category_id}
                  onChange={(e) => handleCategoriesSearch(e.target.value)}
                  onFocus={() => setIsDropdownVisible(true)}
                  onBlur={() =>
                    setTimeout(() => setIsDropdownVisible(false), 200)
                  }
                />
                <div className="relative">
                  {isDropdownVisible && filteredCategories.length > 0 && (
                    <div className="absolute z-10 bg-gray-800 text-gray-200 border rounded-md w-full mt-1 max-h-40 overflow-y-auto shadow-lg">
                      {filteredCategories.map((category) => (
                        <div
                          key={category.id}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:text-gray-900"
                          onClick={() => {
                            setCategoryId(category.id);
                            setIsDropdownVisible(false);
                          }}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-gray-200 shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
