import { useEffect } from "react";
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

  const handleAdd = () => {
    dispatch(setEdit(false));
    dispatch(setModalOpen(true));
    dispatch(resetInitialValues());
  };

  const handleEdit = (row) => {
    dispatch(setModalOpen(true));
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

  return { actionsBtn, variationData, handleAdd, isModalOpen };
};

export default VariationsContainer;
