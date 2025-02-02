import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { ILogin } from "../types/authentication";
import { Login } from "../services/authenticationService";
import Img from "../assets/CreativeHubLogo.png";

export default function Authentication() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const login: ILogin = {
      name,
      password,
    };

    try {
      const res = await Login(login);
      const token = res.data.token;
      const userid = res.data.user.id;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("id", userid);
        showToast("Login was successfull!", "success");
        navigate("/");
      } else {
        showToast("Login was not completed!", "error");
      }
    } catch (error) {
      showToast("Login was not completed!", "error");
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="text-sm text-right">
                <a
                  href="/RecoverPassword/SendEmail"
                  className="font-semibold text-purple-400 hover:text-purple-500"
                >
                  Forgot password?
                </a>
              </div>

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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm/6 font-semibold text-gray-200 shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
