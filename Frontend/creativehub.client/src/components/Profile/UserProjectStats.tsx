import { useEffect, useState } from "react";
import { GetProjectsByUser } from "../../services/projectsService";
import { GetViewsByProject } from "../../services/viewsService";
import { GetLikesByProject } from "../../services/likesService";
import { GetCommentsByProject } from "../../services/commentsService";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IProject } from "../../types/project";
import ProfileHeader from "../../layouts/ProfileHeader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function UserProjectStats() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [stats, setStats] = useState({ views: 0, likes: 0, comments: 0 });
  const [, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    async function fetchProjects() {
      const userProjects = await GetProjectsByUser(userId!);
      setProjects(userProjects.data);
      if (userProjects.data.length > 0) {
        setSelectedProject(userProjects.data[0].id);
      }
    }
    fetchProjects();
  }, [userId]);

  useEffect(() => {
    async function fetchStats() {
      if (!selectedProject) return;
      setLoading(true);
      try {
        const [views, likes, comments] = await Promise.all([
          GetViewsByProject(selectedProject),
          GetLikesByProject(selectedProject),
          GetCommentsByProject(selectedProject),
        ]);
        setStats({
          views: views.data.length,
          likes: likes.data.length,
          comments: comments.data.length,
        });
      } catch (error) {
        setError(`Failed to get status: ${error}`);
      }
      setLoading(false);
    }
    fetchStats();
  }, [selectedProject]);

  const data = {
    labels: ["Views", "Likes", "Comments"],
    datasets: [
      {
        label: "Project Stats",
        data: [stats.views, stats.likes, stats.comments],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <>
      <ProfileHeader />
      <br />
      <div className="mt-[80px] p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl text-center font-semibold text-gray-200 mb-6">
          Project Stats
        </h2>
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2">
            Select Project
          </label>
          <select
            className="w-full p-3 bg-gray-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedProject || ""}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-lg text-gray-300">Loading Stats...</p>
          </div>
        ) : (
          <div className="w-full h-96">
            <Bar
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "white",
                    },
                  },
                  y: {
                    ticks: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
