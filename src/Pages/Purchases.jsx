import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import PurchasesContainer from "../container/purchases.container";
import {
  purchasesColumns,
  purchasesData,
} from "../description/purchases.description";

const Purchases = () => {
  const { actionsBtn, navigateToAddPurchase } = PurchasesContainer();

  return (
    <div className="purchases-section">
      <Navbar
        title="Purchases"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Purchases"
        openCanvas={navigateToAddPurchase}
      />

      <div className="purchases-table">
        <DynamicTable
          columns={purchasesColumns}
          data={purchasesData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default Purchases;
