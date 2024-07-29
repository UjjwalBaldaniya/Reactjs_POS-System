import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePurchase } from "../../api/services/purchaseService";
import { deleteIcon, editIcon } from "../../assets/icons/tables";
import {
  fetchPurchase,
  resetInitialValues,
  setEdit,
} from "../../redux/slice/purchaseSlice";
import { fetchSuppliers } from "../../redux/slice/supplierSlice";
import { formatTimestamp } from "../../utils/functions/dateUtils";

const PurchasesContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { purchaseData = [], status } = useSelector(
    (state) => state.purchase || {}
  );
  const { suppliersData = [] } = useSelector((state) => state?.supplier || {});

  useEffect(() => {
    dispatch(fetchPurchase());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const getSupplierName = (purchaseData) => {
    const getName = suppliersData?.filter(
      (data) => data?._id === purchaseData?.supplier_id?._id
    );
    return getName[0]?.name;
  };

  const purchasesColumns = [
    { label: "Invoice No", accessor: "bill_id" },
    { label: "Supplier", accessor: (row) => getSupplierName(row) },
    {
      label: "Status",
      accessor: "status",
      getBgColor: (value) => {
        if (value === "pending") return "red";
        if (value === "received") return "green";
        return "yellow";
      },
    },
    { label: "Grand Total", accessor: (row) => `$ ${row?.grand_total}` },
    { label: "Items", accessor: (row) => row?.items?.length },
    {
      label: "Created On",
      accessor: (row) => formatTimestamp(row?.created),
      bgColor: "blue",
    },
  ];

  const handleAdd = () => {
    dispatch(resetInitialValues());
    dispatch(setEdit(false));
    navigate("/purchases/create");
  };

  const handleEdit = (row) => {
    dispatch(setEdit(true));
    navigate(`/purchases/edit/${row?._id}`);
  };

  const handleDelete = async (row) => {
    await deletePurchase(row?._id);
    dispatch(fetchPurchase());
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  return { actionsBtn, handleAdd, purchaseData, purchasesColumns, status };
};

export default PurchasesContainer;
