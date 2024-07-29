import { useNavigate } from "react-router-dom";

import { deleteIcon, editIcon } from "../../assets/icons/tables";

const PurchaseReturnContainer = () => {
  const navigate = useNavigate();

  const navigateToPurchaseReturn = () => {
    navigate("/purchase-return/create");
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  return { actionsBtn, navigateToPurchaseReturn };
};

export default PurchaseReturnContainer;
