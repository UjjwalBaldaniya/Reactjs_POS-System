import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../api/services/categoryService";
import { deleteIcon, editIcon } from "../assets/icons/tables";
import {
  fetchCategory,
  fetchCategoryById,
  resetInitialValues,
} from "../redux/slice/categorySlice";

const ProductsCategoriesContainer = () => {
  const dispatch = useDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { categoryData, isModalOpen } = useSelector((state) => state?.category);
  console.log("🚀 ~ ProductsCategoriesContainer ~ categoryData:", categoryData);

  const handleAdd = () => {
    dispatch(resetInitialValues());
    setDrawerOpen(true);
  };

  const handleEdit = (row) => {
    setDrawerOpen(true);
    dispatch(fetchCategoryById(row?._id));
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    deleteCategory(row?._id);
    dispatch(fetchCategory());
    console.log("Delete row:", row);
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return { isDrawerOpen, setDrawerOpen, actionsBtn, categoryData, handleAdd };
};

export default ProductsCategoriesContainer;
