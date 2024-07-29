import DynamicTable from "../common/DynamicTable";
import Loader from "../common/Loader";
import Navbar from "../common/Navbar";
import SuppliersContainer from "../container/supplier/suppliers.container";
import { suppliersColumns } from "../description/suppliers.description";

const Suppliers = () => {
  const { handleAdd, actionsBtn, suppliersData, status } = SuppliersContainer();

  if (status !== "succeeded") return <Loader />;

  return (
    <div>
      <Navbar
        title="Suppliers"
        showNewAddBtn
        newAddBtnText="Create Supplier"
        openCanvas={handleAdd}
      />

      <div className="product-table">
        <DynamicTable
          columns={suppliersColumns}
          data={suppliersData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default Suppliers;
