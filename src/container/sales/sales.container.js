import { useNavigate } from "react-router-dom";
import { deleteIcon, editIcon } from "../../assets/icons/tables";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSales,
  resetInitialValues,
  setEdit,
} from "../../redux/slice/saleSlice";
import { deleteSale } from "../../api/services/saleService";
import { useEffect } from "react";
import { fetchCustomers } from "../../redux/slice/customerSlice";
import { formatTimestamp } from "../../utils/functions/dateUtils";

const SalesContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { salesData = [] } = useSelector((state) => state?.sale || {});

  const { customersData = [] } = useSelector((state) => state?.customer || {});

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const getCustomerName = (saleData) => {
    const getName = customersData?.filter(
      (data) => data?._id === saleData?.customer_id?._id
    );
    return getName[0]?.name;
  };

  const salesColumns = [
    { label: "Invoice No", accessor: "order_id" },
    { label: "Customer", accessor: (row) => getCustomerName(row) },
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
    navigate("/sales/create");
  };

  const handleEdit = (row) => {
    dispatch(setEdit(true));
    navigate(`/sales/edit/${row?._id}`);
  };

  const handleDelete = async (row) => {
    await deleteSale(row?._id);
    dispatch(fetchSales());
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  return { actionsBtn, handleAdd, salesData, salesColumns };
};

export default SalesContainer;
