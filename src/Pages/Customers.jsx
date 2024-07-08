import React from "react";
import Navbar from "../common/Navbar";
import CustomersContainer from "../container/customer/customers.container";
import {
  suppliersColumns,
  suppliersData,
} from "../description/suppliers.description";
import DynamicTable from "../common/DynamicTable";

const Customers = () => {
  const { handleAdd, actionsBtn } = CustomersContainer();

  return (
    <div>
      <Navbar
        title="Customers"
        showExportBtn={true}
        showNewAddBtn={true}
        newAddBtnText="Create Customer"
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

export default Customers;
