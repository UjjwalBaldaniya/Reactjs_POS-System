import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import AddProductsCategories from "../components/productsCategories/AddProductsCategories";
import ProductsCategoriesContainer from "../container/productsCategories.container";
import "../css/productsCatagories.css";
import { columns, data } from "../description/productsCategories.description";

const ProductsCatagories = () => {
  const { isDrawerOpen, setDrawerOpen, actionsBtn } =
    ProductsCategoriesContainer();

  return (
    <div className="products-catagories-section">
      <Navbar
        title="Catagories"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Catagories"
        openCanvas={() => setDrawerOpen(true)}
      />

      <div className="product-category-table">
        <DynamicTable columns={columns} data={data} actions={actionsBtn} />
      </div>

      <AddProductsCategories
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default ProductsCatagories;
