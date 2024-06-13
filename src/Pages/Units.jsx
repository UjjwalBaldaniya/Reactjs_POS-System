import React from "react";
import Navbar from "../common/Navbar";
import DynamicTable from "../common/DynamicTable";
import unitsContainer from "../container/units.container";
import { unitsColumns, unitsData } from "../description/units.description";

const Units = () => {
  const { actionsBtn } = unitsContainer();

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
          columns={unitsColumns}
          data={unitsData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default Units;
