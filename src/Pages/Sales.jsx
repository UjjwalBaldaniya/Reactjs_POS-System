import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import SalesContainer from "../container/sales/sales.container";

const Sales = () => {
  const { actionsBtn, handleAdd, salesData, salesColumns } = SalesContainer();

  return (
    <div className="sales-section">
      <Navbar
        title="Sales"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Sales"
        openCanvas={handleAdd}
      />

      <div className="sales-table">
        <DynamicTable
          columns={salesColumns}
          data={salesData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default Sales;
