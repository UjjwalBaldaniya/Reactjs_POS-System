import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCustomer } from "../../api/services/customerService";
import { deleteIcon, editIcon } from "../../assets/icons/tables";
import {
  fetchCustomers,
  resetInitialValues,
  setEdit,
} from "../../redux/slice/customerSlice";

const CustomersContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customersData = [] } = useSelector((state) => state?.customer || {});

  const handleAdd = () => {
    dispatch(resetInitialValues());
    dispatch(setEdit(false));
    navigate("/customers/create");
  };

  const handleEdit = (row) => {
    dispatch(setEdit(true));
    navigate(`/customers/edit/${row?._id}`);
  };

  const handleDelete = async (row) => {
    await deleteCustomer(row?._id);
    dispatch(fetchCustomers());
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return { handleAdd, actionsBtn, customersData };
};

export default CustomersContainer;
