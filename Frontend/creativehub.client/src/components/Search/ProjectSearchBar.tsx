import { useState } from "react";
import { IProject } from "../../types/project";

interface SearchBarProps {
  projects: IProject[];
  setFilteredProjects: (projects: IProject[]) => void;
}

export default function ProjectSearchBar({
  projects,
  setFilteredProjects,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(term)
    );

    setFilteredProjects(filtered);
  };

  return (
    <div className="flex items-center w-full max-w-md mb-6 space-x-2">
      <input
        type="text"
        placeholder="Search project..."
        className="w-full px-4 py-2 border border-gray-500 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:border-purple-400 transition"
        value={searchTerm}
        onChange={handleSearch}
      />
      <a
        href="/Projects/Create"
        className="flex items-center justify-center bg-purple-400 text-gray-200 px-4 py-2 rounded-md hover:bg-purple-500 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Project
      </a>
    </div>
  );
}
