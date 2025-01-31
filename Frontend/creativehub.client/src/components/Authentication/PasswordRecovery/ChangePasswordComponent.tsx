import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { RecoverPasswordChange } from "../../../services/recoverPasswordService";
import Img from "../../../assets/CreativeHubLogo.png";

export default function RecoverPasswordUpdate() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location]);

  const showToast = (message: string, type: "success" | "error") => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match!", {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
      });
      return;
    }

    try {
      await RecoverPasswordChange({ token, newPassword, confirmNewPassword });
      showToast("Password changed successfully!", "success");
      navigate("/Authentication/Login");
    } catch (error) {
      showToast("Password has not been changed!", "error");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="CreativeHub" src={Img} className="mx-auto h-16 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-200">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <div className="mt-2 relative">
              <input
                type={visibleNewPassword ? "text" : "password"}
                className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                placeholder="New password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                onClick={() => setVisibleNewPassword(!visibleNewPassword)}
              >
                <FontAwesomeIcon
                  icon={visibleNewPassword ? faEye : faEyeSlash}
                />
              </span>
            </div>
          </div>

          <div>
            <div className="mt-2 relative">
              <input
                type={visibleConfirmPassword ? "text" : "password"}
                className="block w-full rounded-md bg-gray-800 border-0 border border-gray-700 py-1.5 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-purple-400 focus:ring-purple-400 sm:text-sm/6"
                placeholder="Confirm new password"
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                onClick={() =>
                  setVisibleConfirmPassword(!visibleConfirmPassword)
                }
              >
                <FontAwesomeIcon
                  icon={visibleConfirmPassword ? faEye : faEyeSlash}
                />
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
