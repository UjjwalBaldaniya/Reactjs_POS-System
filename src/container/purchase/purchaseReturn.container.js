import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteIcon, editIcon } from "../../assets/icons/tables";
import {
  fetchPurchaseReturn,
  resetInitialValues,
  setEdit,
} from "../../redux/slice/purchaseReturnSlice";

const PurchaseReturnContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { purchaseReturnData = [] } = useSelector(
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

  const handleDelete = () => {};

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  return {
    actionsBtn,
    purchaseReturnData,
    handleAdd,
  };
};

export default PurchaseReturnContainer;
