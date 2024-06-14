import React from "react";
import DynamicTable from "../common/DynamicTable";
import {
  purchaseReturnColumns,
  purchaseReturnData,
} from "../description/purchaseReturn.description";
import PurchaseReturnContainer from "../container/purchaseReturn.container";
import AddPurchaseReturn from "../components/purchaseReturn/AddPurchaseReturn";
import Navbar from "../common/Navbar";

const PurchaseReturn = () => {
  const { isDrawerOpen, setDrawerOpen, actionsBtn } = PurchaseReturnContainer();

  return (
    <div className="purchases-section">
      <Navbar
        title="Purchase Return"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Purchase Return"
        openCanvas={() => setDrawerOpen(true)}
      />

      <div className="purchases-table">
        <DynamicTable
          columns={purchaseReturnColumns}
          data={purchaseReturnData}
          actions={actionsBtn}
        />
      </div>

      <AddPurchaseReturn
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default PurchaseReturn;
