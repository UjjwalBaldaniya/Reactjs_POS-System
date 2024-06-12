import React from "react";
import { deleteIcon, editIcon } from "../assets/icons/tables";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import "../css/productsCatagories.css";

const ProductsCatagories = () => {
  const columns = [
    { label: "Product Category", accessor: "category" },
    { label: "Product Count", accessor: "count" },
    { label: "Actions", accessor: "actions" },
  ];

  const handleEdit = (row) => {
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete row:", row);
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  const data = [
    {
      category: "Pizza",
      image:
        "https://infypos-demo.nyc3.digitaloceanspaces.com/product_category/1669/pizza.jpg",
      count: "5",
      actions: actionsBtn,
    },
    {
      category: "Burger",
      image:
        "https://infypos-demo.nyc3.digitaloceanspaces.com/product_category/1668/wallpaperflare.com_wallpaper.jpg",
      count: "10",
      actions: actionsBtn,
    },
  ];

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
        <DynamicTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ProductsCatagories;
