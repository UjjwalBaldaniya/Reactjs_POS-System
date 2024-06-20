import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteIcon, editIcon } from "../assets/icons/tables";
import {
  fetchBaseUnitById,
  fetchBaseUnits,
  resetInitialValues,
  setEdit,
} from "../redux/slice/baseUnitSlice";
import { deleteBaseUnit } from "../api/services/baseUnitsService";

const BaseUnitsContainer = () => {
  const dispatch = useDispatch();
  const { baseUnitsData } = useSelector((state) => state?.baseUnit);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleAdd = () => {
    dispatch(resetInitialValues({ name: "" }));
    dispatch(setEdit(false));
    setDrawerOpen(true);
  };

  const handleEdit = (row) => {
    dispatch(setEdit(true));
    dispatch(fetchBaseUnitById(row?._id));
    setDrawerOpen(true);
  };

  const handleDelete = (row) => {
    deleteBaseUnit(row?._id);
    dispatch(fetchBaseUnits());
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  useEffect(() => {
    dispatch(fetchBaseUnits());
  }, [dispatch]);

  return {
    isDrawerOpen,
    handleAdd,
    setDrawerOpen,
    actionsBtn,
    baseUnitsData,
  };
};

export default BaseUnitsContainer;
