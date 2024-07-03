import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import SuppliersContainer from "../container/supplier/suppliers.container";
import {
  suppliersColumns,
  suppliersData,
} from "../description/suppliers.description";

const Suppliers = () => {
  const { handleAdd, actionsBtn } = SuppliersContainer();

  return (
    <div>
      <Navbar
        title="Suppliers"
        showExportBtn={true}
        showNewAddBtn={true}
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
