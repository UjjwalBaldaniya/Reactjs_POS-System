import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUnit } from "../../api/services/unitService";
import { deleteIcon, editIcon } from "../../assets/icons/tables";
import { fetchBaseUnits } from "../../redux/slice/baseUnitSlice";
import {
  fetchUnitById,
  fetchUnits,
  resetInitialValues,
  setEdit,
  setModalOpen,
} from "../../redux/slice/unitSlice";

const UnitsContainer = () => {
  const dispatch = useDispatch();
  const {
    unitsData = [],
    isModalOpen,
    status,
  } = useSelector((state) => state?.unit || {});

  const handleAdd = () => {
    dispatch(setEdit(false));
    dispatch(setModalOpen(true));
    dispatch(resetInitialValues());
  };

  const handleEdit = (row) => {
    dispatch(setEdit(true));
    dispatch(fetchUnitById(row?._id));
    dispatch(setModalOpen(true));
  };

  const handleDelete = (row) => {
    deleteUnit(row?._id);
    dispatch(fetchUnits());
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  useEffect(() => {
    dispatch(fetchBaseUnits());
    dispatch(fetchUnits());
  }, [dispatch]);

  return {
    actionsBtn,
    handleAdd,
    unitsData,
    isModalOpen,
    status,
  };
};

export default UnitsContainer;
