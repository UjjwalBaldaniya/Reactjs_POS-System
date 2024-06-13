import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./ProtectedRouts/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductsCatagories from "./pages/ProductsCatagories.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignInSingUp from "./pages/SignInSingUp.jsx";
import SignUp from "./pages/SignUp.jsx";
import Table from "./pages/Table.jsx";
import Units from "./pages/Units.jsx";
import Variations from "./pages/Variations.jsx";
import BaseUnits from "./pages/BaseUnits.jsx";

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
                  <Route path="/categories" element={<ProductsCatagories />} />
                  <Route path="/variations" element={<Variations />} />
                  <Route path="/units" element={<Units />} />
                  <Route path="/base-units" element={<BaseUnits />} />
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
