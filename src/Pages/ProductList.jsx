import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";

const ProductList = () => {
  const navigate = useNavigate();

  const handelNavigate = () => {
    navigate("/products/create");
  };

  return (
    <div>
      <Navbar
        title="Products"
        showExportBtn={true}
        showNewAddBtn={true}
        newAddBtnText="New Product"
        openCanvas={() => handelNavigate()}
      />

      <div className="d-flex align-items-center">
        <div>
          <button className="add-products">
            <div className="d-flex align-content-center">
              <span>All Item</span>
            </div>
          </button>
        </div>
        <div>
          <button className="add-products-filter">
            <div className="d-flex align-items-center">
              <h1 className="add-products-filter-img">🍱</h1>
              <span className="fw-bolder">Side Dishes</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
