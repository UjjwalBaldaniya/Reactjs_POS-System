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
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
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
import PrintBarcode from "./pages/PrintBarcode.jsx";

function App() {
  const language = useSelector((state) => state?.language?.language);
  const navigate = useNavigate();
  const authUser = localStorage.getItem("authUser");

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
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/table" element={<Table />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<AddProduct />} />
            <Route path="/categories" element={<ProductsCatagories />} />
            <Route path="/variations" element={<Variations />} />
            <Route path="/units" element={<Units />} />
            <Route path="/base-units" element={<BaseUnits />} />
            <Route path="/print-barcode" element={<PrintBarcode />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
