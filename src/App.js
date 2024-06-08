import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { useState } from "react";

function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  const pathname1 = ["/sign-up", "/sign-in"];

  return (
    <>
      <BrowserRouter>
        <div
          className="container-fluid"
          style={{ direction: language === "EN" ? "ltr" : "rtl" }}
        >
          {pathname1.includes(window.location.pathname) ? (
            <Routes>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
            </Routes>
          ) : (
            <div className="row">
              <div className="d-none d-lg-block col-3 col-xl-2 p-0">
                <Sidebar />
              </div>
              <div
                style={{ height: "100vh", overflow: "auto" }}
                className="col col-xl-10 px-4 "
              >
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <Dashboard
                        setLanguage={setLanguage}
                        language={language}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          )}
          {/* <div className="row">
            <div className="d-none d-lg-block col-3 col-xl-2 p-0">
              <Sidebar />
            </div>
            <div
              style={{ height: "100vh", overflow: "auto" }}
              className="col col-xl-10 px-4 "
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
              </Routes>
            </div>
          </div> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
