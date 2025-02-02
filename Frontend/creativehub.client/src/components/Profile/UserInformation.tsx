import { useEffect, useState } from "react";
import { GetUserById, UpdateUser } from "../../services/usersService";
import { IUser } from "../../types/user";
import UserProfileHeader from "../../layouts/ProfileHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function MyInformation() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [visible, setVisible] = useState<boolean>(true);
  const [formData, setFormData] = useState<Partial<IUser>>({
    name: "",
    email: "",
    password: "",
    role: "",
    bio: "",
    avatar_url: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await GetUserById(userId!);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: "",
          role: response.data.role,
          bio: response.data.bio,
          avatar_url: response.data.avatar_url,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      role: user?.role || "",
      bio: user?.bio || "",
      avatar_url: user?.avatar_url || "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await UpdateUser(formData);
      setUser({ ...user!, ...formData });
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <UserProfileHeader />
      <div className="flex items-start justify-center mt-[120px]">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-purple-500 mb-6 text-center">
            Profile
          </h2>

          {user ? (
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <img
                  src={
                    formData.avatar_url ||
                    "https://pngimg.com/d/anonymous_mask_PNG28.png"
                  }
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full border-4 border-purple-500"
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full mt-1 p-2 border bg-gray-800 text-gray-200 ${
                        isEditing
                          ? "border-purple-500 focus:border-purple-600"
                          : "border-gray-400"
                      } rounded-md`}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full mt-1 p-2 border bg-gray-800 text-gray-200 ${
                        isEditing
                          ? "border-purple-500 focus:border-purple-600"
                          : "border-gray-300"
                      } rounded-md`}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-400">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={visible ? "password" : "text"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full mt-1 p-2 pr-10 border bg-gray-800 text-gray-200 ${
                        isEditing
                          ? "border-purple-500 focus:border-purple-600"
                          : "border-gray-300"
                      } rounded-md`}
                    />
                    <span
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-400">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full mt-1 p-2 border bg-gray-800 text-gray-200 ${
                      isEditing
                        ? "border-purple-500 focus:border-purple-600"
                        : "border-gray-300"
                    } rounded-md`}
                  >
                    <option
                      value="designer"
                      selected={formData.role === "designer"}
                    >
                      Designer
                    </option>
                    <option
                      value="photographer"
                      selected={formData.role === "photographer"}
                    >
                      Photographer
                    </option>
                    <option
                      value="developer"
                      selected={formData.role === "developer"}
                    >
                      Developer
                    </option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-400">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleTextAreaChange}
                    disabled={!isEditing}
                    className={`w-full mt-1 p-2 border bg-gray-800 text-gray-200 ${
                      isEditing
                        ? "border-purple-500 focus:border-purple-600"
                        : "border-gray-300"
                    } rounded-md`}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-400">
                    Avatar URL
                  </label>
                  <input
                    type="text"
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full mt-1 p-2 border bg-gray-800 text-gray-200 ${
                      isEditing
                        ? "border-purple-500 focus:border-purple-600"
                        : "border-gray-300"
                    } rounded-md`}
                    placeholder="Enter Avatar URL"
                  />
                </div>

                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="w-full bg-purple-500 text-gray-200 py-2 rounded-md hover:bg-purple-600 transition"
                  >
                    Edit Information
                  </button>
                ) : (
                  <div className="flex space-x-4">
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
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading profile...</p>
          )}
        </div>
      </div>
    </>
  );
}
