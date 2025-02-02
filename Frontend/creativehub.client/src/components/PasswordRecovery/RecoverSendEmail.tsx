import React, { useState } from "react";
import { toast } from "react-toastify";
import { RecoverPasswordSendEmail } from "../../services/recoverPasswordService";
import Img from "../../assets/CreativeHubLogo.png";

export default function RecoverPasswordEmail() {
  const [email, setEmail] = useState("");

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
    try {
      const sendEmailData = { email };
      await RecoverPasswordSendEmail(sendEmailData);
      showToast("Recovery email sent successfully!", "success");
    } catch (error) {
      showToast("Error sending recovery email!", "error");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="CreativeHub" src={Img} className="mx-auto h-16 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200">
            Recover Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm/6 font-semibold text-gray-200 shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
