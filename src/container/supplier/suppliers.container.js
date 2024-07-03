import { useNavigate } from "react-router-dom";
import { deleteIcon, editIcon } from "../../assets/icons/tables";

const SuppliersContainer = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/suppliers/create");
  };

  const handleEdit = (row) => {};

  const handleDelete = (row) => {};

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  return { handleAdd, actionsBtn };
};

export default SuppliersContainer;
