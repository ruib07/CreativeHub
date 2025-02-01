import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import GoToTopPage from "./hooks/GoToTopPage";
import ScrollToTopButton from "./hooks/ScrollToTopButton";

import NotFound from "./components/404";
import NewRegistration from "./components/Authentication/RegistrationComponent";
import Authentication from "./components/Authentication/LoginComponent";
import RecoverPasswordEmail from "./components/Authentication/PasswordRecovery/RecoverSendEmailComponent";
import RecoverPasswordUpdate from "./components/Authentication/PasswordRecovery/ChangePasswordComponent";
import Dashboard from "./components/HomeComponent";
import NewProject from "./components/Projects/AddProjectComponent";
import Projects from "./components/Projects/Projects";
import Categories from "./components/Categories/CategoriesComponent";
import NewCategory from "./components/Categories/AddCategoryComponent";

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
            <Route path="/Categories/Create" element={<NewCategory />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
