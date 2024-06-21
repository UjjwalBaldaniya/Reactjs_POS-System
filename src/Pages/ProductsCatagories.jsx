import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import AddProductsCategories from "../components/productsCategories/AddProductsCategories";
import ProductsCategoriesContainer from "../container/productsCategories.container";
import "../css/productsCatagories.css";
import { columns } from "../description/productsCategories.description";

const ProductsCatagories = () => {
  const { isModalOpen, actionsBtn, categoryData, handleAdd } =
    ProductsCategoriesContainer();

  return (
    <div className="products-catagories-section">
      <Navbar
        title="Catagories"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Catagories"
        openCanvas={handleAdd}
      />

      <div className="product-category-table">
        <DynamicTable
          columns={columns}
          data={categoryData}
          actions={actionsBtn}
        />
      </div>

      <AddProductsCategories isModalOpen={isModalOpen} />
    </div>
  );
};

export default ProductsCatagories;
