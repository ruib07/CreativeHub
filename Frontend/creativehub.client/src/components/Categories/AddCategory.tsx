import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/CreativeHubLogo.png";
import Header from "../../layouts/Header";
import { ICategory } from "../../types/category";
import { CreateCategory } from "../../services/categoriesService";
import { showToast } from "../../utils/toastHelper";

export default function NewCategory() {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory: ICategory = {
      name,
    };

    try {
      await CreateCategory(newCategory);
      showToast("Registration completed successfully!", "success");

      setName("");
      navigate("/");
    } catch (error) {
      showToast("Registration was not completed!", "error");
    }
  };

  return (
    <>
      <Header />
      <br />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="CreativeHub" src={Img} className="mx-auto h-16 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-200">
            Create Category
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
