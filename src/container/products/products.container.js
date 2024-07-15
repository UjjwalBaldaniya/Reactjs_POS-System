import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../api/services/productService";
import { deleteIcon, editIcon } from "../../assets/icons/tables";
import {
  fetchProducts,
  resetInitialValues,
  setEdit,
} from "../../redux/slice/product.slice";

const ProductsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productsData = [], status } = useSelector(
    (state) => state.product || {}
  );

  const handleAdd = async () => {
    await dispatch(setEdit(false));
    await dispatch(resetInitialValues());
    navigate("/products/create");
  };

  const handleEdit = async (row) => {
    await dispatch(setEdit(true));
    navigate(`/products/edit/${row?._id}`);
  };

  const handleDelete = async (row) => {
    await deleteProduct(row?._id);
    dispatch(fetchProducts());
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return { actionsBtn, productsData, handleAdd, status };
};

export default ProductsContainer;
