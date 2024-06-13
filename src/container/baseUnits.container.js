import { deleteIcon, editIcon } from "../assets/icons/tables";

const baseUnitsContainer = () => {
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

  return { actionsBtn };
};

export default baseUnitsContainer;
