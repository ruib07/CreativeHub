import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { IRegistration } from "../types/authentication";
import { Registration } from "../services/authenticationService";
import Img from "../assets/CreativeHubLogo.png";

export default function NewRegistration() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [avatar_url, setAvatarUrl] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);
  const navigate = useNavigate();

  const showToast = (message: string, type: "success" | "error") => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: IRegistration = {
      name,
      email,
      password,
      role,
      bio,
      avatar_url,
    };

    try {
      await Registration(newUser);
      showToast("Registration completed successfully!", "success");

      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setBio("");
      setAvatarUrl("");
      navigate("/Authentication/Login");
    } catch (error) {
      showToast("Registration was not completed!", "error");
    }
  };

  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="CreativeHub" src={Img} className="mx-auto h-16 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200">
            Create Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <div className="mt-2">
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-2 relative">
                <input
                  type={visible ? "password" : "text"}
                  id="Password"
                  name="Password"
                  className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6 pr-10"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} />
                </span>
              </div>
            </div>

            <div>
              <select
                className="block w-full rounded-md bg-gray-800 border border-gray-700 py-1.5 text-gray-200 shadow-sm focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="designer">Designer</option>
                <option value="photographer">Photographer</option>
                <option value="developer">Developer</option>
              </select>
            </div>

            <div>
              <div className="mt-2">
                <textarea
                  className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  rows={4}
                  placeholder="Add your bio..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  type="text"
                  id="AvatarUrl"
                  name="AvatarUrl"
                  className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  placeholder="Avatar url"
                  required
                  value={avatar_url}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm/6 font-semibold text-gray-200 shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
