import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePurchaseReturn } from "../../api/services/purchaseReturnService";
import { deleteIcon, editIcon } from "../../assets/icons/tables";
import {
  fetchPurchaseReturn,
  setEdit,
} from "../../redux/slice/purchaseReturnSlice";
import { resetInitialValues } from "../../redux/slice/purchaseSlice";

const PurchaseReturnContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { purchaseReturnData = [], status } = useSelector(
    (state) => state?.purchaseReturn || {}
  );

  useEffect(() => {
    dispatch(fetchPurchaseReturn());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(setEdit(false));
    dispatch(resetInitialValues());
    navigate("/purchase-return/create");
  };

  const handleEdit = (row) => {
    dispatch(setEdit(true));
    navigate(`/purchase-return/edit/${row?.id}`);
  };

  const handleDelete = async (row) => {
    await deletePurchaseReturn(row?.id);
    dispatch(fetchPurchaseReturn());
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  return {
    actionsBtn,
    purchaseReturnData,
    status,
    handleAdd,
  };
};

export default PurchaseReturnContainer;
