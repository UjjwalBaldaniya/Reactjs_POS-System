import { useNavigate } from "react-router-dom";
import { deleteIcon, editIcon } from "../assets/icons/tables";

const PurchaseReturnContainer = () => {
  const navigate = useNavigate();

  const navigateToPurchaseReturn = () => {
    navigate("/purchase-return/create");
  };

  const handleEdit = (row) => {
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete row:", row);
  };

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  return { actionsBtn, navigateToPurchaseReturn };
};

export default PurchaseReturnContainer;
