import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import CreateCustomer from "./components/customer/CreateCustomer.jsx";
import AddProduct from "./components/products/AddProduct.jsx";
import AddPurchaseReturn from "./components/purchaseReturn/AddPurchaseReturn.jsx";
import AddPurchases from "./components/purchases/AddPurchases.jsx";
import CreateSupplier from "./components/supplier/CreateSupplier.jsx";
import BaseUnits from "./pages/BaseUnits.jsx";
import Customers from "./pages/Customers.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import ProductsCatagories from "./pages/ProductsCatagories.jsx";
import PurchaseReturn from "./pages/PurchaseReturn.jsx";
import Purchases from "./pages/Purchases.jsx";
import Sales from "./pages/Sales.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import Table from "./pages/Table.jsx";
import Units from "./pages/Units.jsx";
import Variations from "./pages/Variations.jsx";

function App() {
  const language = useSelector((state) => state?.language?.language);

  return (
    <>
      <ToastContainer />
      <div
        className="container-fluid"
        style={{ direction: language === "EN" ? "ltr" : "rtl" }}
      >
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/table" element={<Table />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<AddProduct />} />
            <Route path="/categories" element={<ProductsCatagories />} />
            <Route path="/variations" element={<Variations />} />
            <Route path="/units" element={<Units />} />
            <Route path="/base-units" element={<BaseUnits />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/purchases/create" element={<AddPurchases />} />
            <Route path="/purchases/edit/:id" element={<AddPurchases />} />
            <Route path="/purchase-return" element={<PurchaseReturn />} />
            <Route
              path="/purchase-return/create"
              element={<AddPurchaseReturn />}
            />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales-return" element={<PurchaseReturn />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/create" element={<CreateSupplier />} />
            <Route path="/suppliers/edit/:id" element={<CreateSupplier />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/create" element={<CreateCustomer />} />
            <Route path="/customers/edit/:id" element={<CreateCustomer />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
