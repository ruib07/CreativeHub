import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import GoToTopPage from "./components/Button/GoToTopPage";
import ScrollToTopButton from "./components/Button/ScrollToTopButton";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";

import NewRegistration from "./pages/Registration";
import Authentication from "./pages/Login";
import RecoverPasswordEmail from "./components/PasswordRecovery/RecoverSendEmail";
import RecoverPasswordUpdate from "./components/PasswordRecovery/ChangePassword";

import NewCategory from "./components/Categories/AddCategory";
import Categories from "./components/Categories/Categories";

import NewProject from "./components/Projects/AddProject";
import Projects from "./components/Projects/Projects";
import ProjectDetails from "./components/Projects/ProjectDetails";
import EditProject from "./components/Projects/UpdateProject";

import MyInformation from "./components/Profile/UserInformation";
import UserProjects from "./components/Profile/UserProjects";
import UserProjectComments from "./components/Profile/UserComments";
import UserProjectLikes from "./components/Profile/UserLikes";
import UserProjectStats from "./components/Profile/UserProjectStats";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <ToastContainer
          toastStyle={{
            backgroundColor: "#1E1E1E",
            color: "#E0E0E0",
            border: "1px solid #374151",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        />
        <GoToTopPage />
        <ScrollToTopButton />

        <div className="flex-grow container mx-auto">
          <Routes>
            <Route
              path="/Authentication/Registration"
              element={<NewRegistration />}
            />
            <Route path="/Authentication/Login" element={<Authentication />} />
            <Route
              path="/RecoverPassword/SendEmail"
              element={<RecoverPasswordEmail />}
            />
            <Route
              path="/RecoverPassword/ChangePassword"
              element={<RecoverPasswordUpdate />}
            />
            <Route path="/" element={<Dashboard />} />
            <Route path="/Projects/Create" element={<NewProject />} />
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Project/:projectId" element={<ProjectDetails />} />
            <Route
              path="/Project/Update/:projectId"
              element={<EditProject />}
            />
            <Route path="/Categories/Create" element={<NewCategory />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/MyInfo" element={<MyInformation />} />
            <Route path="/MyProjects" element={<UserProjects />} />
            <Route path="/MyComments" element={<UserProjectComments />} />
            <Route path="/MyLikes" element={<UserProjectLikes />} />
            <Route path="/MyProjectStats" element={<UserProjectStats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
