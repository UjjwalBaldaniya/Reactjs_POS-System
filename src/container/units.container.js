import { useEffect, useState } from "react";
import { deleteIcon, editIcon } from "../assets/icons/tables";
import { useDispatch, useSelector } from "react-redux";
import { fetchBaseUnits } from "../redux/slice/baseUnitSlice";
import { fetchUnitById, fetchUnits, setEdit } from "../redux/slice/unitSlice";
import { deleteUnit } from "../api/services/unitService";

const UnitsContainer = () => {
  const dispatch = useDispatch();
  const { unitsData } = useSelector((state) => state?.unit);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleAdd = () => {
    dispatch(setEdit(false));
    setDrawerOpen(true);
  };

  const handleEdit = (row) => {
    dispatch(setEdit(true));
    dispatch(fetchUnitById(row?._id));
    setDrawerOpen(true);
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

  return { isDrawerOpen, setDrawerOpen, actionsBtn, handleAdd, unitsData };
};

export default UnitsContainer;
