import React from "react";
import baseUnitsContainer from "../container/baseUnits.container";
import Navbar from "../common/Navbar";
import DynamicTable from "../common/DynamicTable";
import {
  baseUnitsColumns,
  baseUnitsData,
} from "../description/baseUnits.description";

const BaseUnits = () => {
  const { actionsBtn } = baseUnitsContainer();

  return (
    <div className="products-catagories-section">
      <Navbar
        title="Products Catagories"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Products Catagories"
        // openCanvas={() => setShowTable(true)}
      />

      <div className="product-category-table">
        <DynamicTable
          columns={baseUnitsColumns}
          data={baseUnitsData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default BaseUnits;
