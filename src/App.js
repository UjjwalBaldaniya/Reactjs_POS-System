import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  var pathname = window.location.pathname;
  console.log("aaaa", pathname);

  const pathname1 = ["/sign-up", "/sign-in"];
  if (pathname1.includes(window.location.pathname)) {
    console.log("first");
  }

  return (
    <>
      <BrowserRouter>
        <div className="container-fluid">
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
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/sign-in" element={<SignIn />} />
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
