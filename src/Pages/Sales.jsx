import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import SalesContainer from "../container/sales/sales.container";
import Loader from "../common/Loader";

const Sales = () => {
  const { actionsBtn, handleAdd, salesData, salesColumns, status } =
    SalesContainer();

  if (status !== "succeeded") return <Loader />;

  return (
    <div className="sales-section">
      <Navbar
        title="Sales"
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
