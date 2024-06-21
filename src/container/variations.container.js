import { useEffect, useState } from "react";
import { deleteIcon, editIcon } from "../assets/icons/tables";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVariationById,
  fetchVariations,
  resetInitialValues,
  setEdit,
} from "../redux/slice/variationSlice";
import { deleteVariation } from "../api/services/variationsService";

const VariationsContainer = () => {
  const dispatch = useDispatch();
  const { variationData, isModalOpen } = useSelector(
    (state) => state?.variation
  );

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleAdd = () => {
    dispatch(setEdit(false));
    setDrawerOpen(true);
    dispatch(resetInitialValues());
  };

  const handleEdit = (row) => {
    setDrawerOpen(true);
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

  return { isDrawerOpen, setDrawerOpen, actionsBtn, variationData, handleAdd };
};

export default VariationsContainer;
