import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import SalesContainer from "../container/sales/sales.container";
import {
  salesColumns,
  salesData,
} from "../description/sales/sales.description";

const Sales = () => {
  const { actionsBtn, navigateToAddPurchase } = SalesContainer();

  return (
    <div className="sales-section">
      <Navbar
        title="Sales"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Sales"
        openCanvas={navigateToAddPurchase}
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
