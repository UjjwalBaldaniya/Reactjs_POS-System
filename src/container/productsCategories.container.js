import { useState } from "react";
import { deleteIcon, editIcon } from "../assets/icons/tables";

const ProductsCategoriesContainer = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleEdit = (row) => {
    setDrawerOpen(true);
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete row:", row);
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  return { isDrawerOpen, setDrawerOpen, actionsBtn };
};

export default ProductsCategoriesContainer;
