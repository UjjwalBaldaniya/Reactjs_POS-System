import React from "react";
import baseUnitsContainer from "../container/baseUnits.container";
import Navbar from "../common/Navbar";
import DynamicTable from "../common/DynamicTable";
import {
  baseUnitsColumns,
  baseUnitsData,
} from "../description/baseUnits.description";
import AddBaseUnits from "../components/baseUnits/AddBaseUnits";

const BaseUnits = () => {
  const { isDrawerOpen, setDrawerOpen, actionsBtn } = baseUnitsContainer();

  return (
    <div className="products-catagories-section">
      <Navbar
        title="Products Catagories"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Products Catagories"
        openCanvas={() => setDrawerOpen(true)}
      />

      <div className="product-category-table">
        <DynamicTable
          columns={baseUnitsColumns}
          data={baseUnitsData}
          actions={actionsBtn}
        />
      </div>

      <AddBaseUnits
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default BaseUnits;
