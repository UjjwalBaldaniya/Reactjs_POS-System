import React from "react";
import Navbar from "../common/Navbar";
import PurchasesContainer from "../container/purchases.container";
import DynamicTable from "../common/DynamicTable";
import {
  purchasesColumns,
  purchasesData,
} from "../description/purchases.description";
import AddPurchases from "../components/purchases/AddPurchases";

const Purchases = () => {
  const { isDrawerOpen, setDrawerOpen, actionsBtn } = PurchasesContainer();

  return (
    <div className="purchases-section">
      <Navbar
        title="Purchases"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Purchases"
        openCanvas={() => setDrawerOpen(true)}
      />

      <div className="purchases-table">
        <DynamicTable
          columns={purchasesColumns}
          data={purchasesData}
          actions={actionsBtn}
        />
      </div>

      <AddPurchases
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default Purchases;
