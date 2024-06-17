import { useNavigate } from "react-router-dom";
import { deleteIcon, editIcon } from "../assets/icons/tables";

const PurchasesContainer = () => {
  const navigate = useNavigate();

  const navigateToAddPurchase = () => {
    navigate("/purchases/create");
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

  return { actionsBtn, navigateToAddPurchase };
};

export default PurchasesContainer;
