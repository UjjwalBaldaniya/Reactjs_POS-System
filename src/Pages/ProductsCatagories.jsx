import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import productsCategoriesContainer from "../container/productsCategories.container";
import "../css/productsCatagories.css";
import { columns, data } from "../description/productsCategories.description";

const ProductsCatagories = () => {
  const { actionsBtn } = productsCategoriesContainer();

  return (
    <div className="products-catagories-section">
      <Navbar
        title="Products Catagories"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Products Catagories"
        // openCanvas={() => setShowTable(true)}
      />

      <div className="product-category-table">
        <DynamicTable columns={columns} data={data} actions={actionsBtn} />
      </div>
    </div>
  );
};

export default ProductsCatagories;
