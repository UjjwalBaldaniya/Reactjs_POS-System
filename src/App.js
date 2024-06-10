import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import SignIn from "./Pages/SignIn";
import SignInSingUp from "./Pages/SignInSingUp.jsx";
import SignUp from "./Pages/SignUp";
import ProtectedRoute from "./ProtectedRouts/ProtectedRoute";

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authUser = localStorage.getItem("authUser");
  const pathname1 = ["/sign-up", "/sign-in"];
  if (pathname1.includes(pathname)) {
  }

  useEffect(() => {
    if (authUser !== "true") {
      navigate("/sign-in");
    }
  }, []);
  return (
    <>
      <div
        className="container-fluid"
        style={{ direction: language === "EN" ? "ltr" : "rtl" }}
      >
        {pathname1.includes(pathname) ? (
          <Routes>
            <Route path="/" element={<Navigate to="/sign-in" />} />
            <Route
              path="/sign-up"
              element={
                <SignInSingUp
                  Component={SignUp}
                  language={language}
                  setLanguage={setLanguage}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <SignInSingUp
                  Component={SignIn}
                  language={language}
                  setLanguage={setLanguage}
                />
              }
            />
          </Routes>
        ) : (
          <div className="row">
            <div className="d-none d-lg-block col-3 col-xl-2 p-0">
              <Sidebar language={language} />
            </div>
            <div
              style={{ height: "100vh", overflow: "auto" }}
              className="col col-xl-10 px-4 "
            >
              <Routes>
                <Route path="/" element={<Navigate to="/sign-in" />} />
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard
                        language={language}
                        setLanguage={setLanguage}
                      />
                    }
                  />
                </Route>
              </Routes>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
