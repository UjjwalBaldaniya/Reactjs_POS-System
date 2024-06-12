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
import Table from "./Pages/Table.jsx";
import ProductList from "./Pages/ProductList.jsx";
import AddProduct from "./Pages/AddProduct.jsx";
import { useSelector } from "react-redux";
import ProductsCatagories from "./Pages/ProductsCatagories.jsx";

function App() {
  const language = useSelector((state) => state?.language?.language);

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
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/table" element={<Table />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/create" element={<AddProduct />} />
                  <Route
                    path="/products-categories"
                    element={<ProductsCatagories />}
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
