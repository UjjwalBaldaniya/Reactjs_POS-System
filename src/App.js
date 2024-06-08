// import {
//   BrowserRouter,
//   Route,
//   Routes,
//   useLocation,
//   Navigate,
// } from "react-router-dom";
// import "./App.css";
// import Sidebar from "./Components/Sidebar";
// import Dashboard from "./Pages/Dashboard";
// import SignIn from "./Pages/SignIn";
// import SignUp from "./Pages/SignUp";

// function App() {
//   const { pathname } = useLocation();
//   console.log("aaaa", pathname);

//   const pathname1 = ["/sign-up", "/sign-in"];
//   if (pathname1.includes(pathname)) {
//     console.log("first");
//   }

//   return (
//     <>
//       <div className="container-fluid">
//         {pathname1.includes(pathname) ? (
//           <Routes>
//             <Route path="/" element={<Navigate to="/sign-in" />} />
//             <Route path="/sign-up" element={<SignUp />} />
//             <Route path="/sign-in" element={<SignIn />} />
//           </Routes>
//         ) : (
//           <div className="row">
//             <div className="d-none d-lg-block col-3 col-xl-2 p-0">
//               <Sidebar />
//             </div>
//             <div
//               style={{ height: "100vh", overflow: "auto" }}
//               className="col col-xl-10 px-4 "
//             >
//               <Routes>
//                 <Route path="/" element={<Navigate to="/sign-in" />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/sign-up" element={<SignUp />} />
//                 <Route path="/sign-in" element={<SignIn />} />
//               </Routes>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;

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
import { useAuth } from "./Context/AuthContext.jsx";
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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("isAuthenticated", isAuthenticated);
  const authUser = localStorage.getItem("authUser");
  console.log("🚀 ~ file: App.js:81 ~ App ~ authUser:", authUser);
  const pathname1 = ["/sign-up", "/sign-in"];
  if (pathname1.includes(pathname)) {
    console.log("first");
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
              element={<SignInSingUp Component={SignUp} />}
            />
            <Route
              path="/sign-in"
              element={<SignInSingUp Component={SignIn} />}
            />
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
                <Route path="/" element={<Navigate to="/sign-in" />} />
                <Route path="/dashboard" element={<ProtectedRoute />}>
                  <Route
                    path=""
                    element={
                      <Dashboard
                        language={language}
                        setLanguage={setLanguage}
                      />
                    }
                  />
                </Route>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
