import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import { GetCategories } from "../../services/categoriesService";
import { ICategory } from "../../types/category";
import CategorySearchBar from "../Search/CategorySearchBar";

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetCategories();
        setCategories(response.data);
        setFilteredCategories(response.data);
      } catch (error) {
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/Category/${encodeURIComponent(categoryId)}`);
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <div className="flex flex-col items-center p-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">
          Categories
        </h1>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <CategorySearchBar
          categories={categories}
          setFilteredCategories={setFilteredCategories}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-8xl">
          {filteredCategories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.id!)}
              className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer bg-gray-800 transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-500"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-200">
                  {category.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
