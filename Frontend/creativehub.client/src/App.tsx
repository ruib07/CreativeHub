import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "./components/404";
import NewRegistration from "./components/Authentication/RegistrationComponent";
import Authentication from "./components/Authentication/LoginComponent";
import RecoverPasswordEmail from "./components/Authentication/PasswordRecovery/RecoverSendEmailComponent";
import RecoverPasswordUpdate from "./components/Authentication/PasswordRecovery/ChangePasswordComponent";

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
