import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVariation } from "../../api/services/variationsService";
import { deleteIcon, editIcon } from "../../assets/icons/tables";
import {
  fetchVariationById,
  fetchVariations,
  resetInitialValues,
  setEdit,
  setModalOpen,
} from "../../redux/slice/variationSlice";

const VariationsContainer = () => {
  const dispatch = useDispatch();
  const { variationData, isModalOpen } = useSelector(
    (state) => state?.variation
  );
  console.log("🚀 ~ VariationsContainer ~ isModalOpen:", isModalOpen);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleAdd = () => {
    dispatch(setEdit(false));
    // setDrawerOpen(true);
    dispatch(setModalOpen(true));
    dispatch(resetInitialValues());
  };

  const handleEdit = (row) => {
    dispatch(setModalOpen(true));
    // setDrawerOpen(true);
    dispatch(setEdit(true));
    dispatch(fetchVariationById(row?._id));
  };

  const handleDelete = (row) => {
    deleteVariation(row?._id);
    dispatch(fetchVariations());
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  useEffect(() => {
    dispatch(fetchVariations());
  }, [dispatch]);

  return { isModalOpen, actionsBtn, variationData, handleAdd };
};

export default VariationsContainer;
