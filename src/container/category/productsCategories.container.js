import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../api/services/categoryService";
import { deleteIcon, editIcon } from "../../assets/icons/tables";
import {
  fetchCategory,
  fetchCategoryById,
  resetInitialValues,
  setEdit,
  setModalOpen,
} from "../../redux/slice/categorySlice";

const ProductsCategoriesContainer = () => {
  const dispatch = useDispatch();

  const { categoryData = [], isModalOpen } = useSelector(
    (state) => state?.category || {}
  );

  const handleAdd = () => {
    dispatch(resetInitialValues());
    dispatch(setModalOpen(true));
    dispatch(setEdit(false));
  };

  const handleEdit = (row) => {
    dispatch(setModalOpen(true));
    dispatch(setEdit(true));
    dispatch(fetchCategoryById(row?._id));
  };

  const handleDelete = (row) => {
    deleteCategory(row?._id);
    dispatch(fetchCategory());
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return { isModalOpen, actionsBtn, categoryData, handleAdd };
};

export default ProductsCategoriesContainer;
