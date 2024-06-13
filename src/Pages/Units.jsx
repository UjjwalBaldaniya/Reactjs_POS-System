import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import AddUnits from "../components/units/AddUnits";
import UnitsContainer from "../container/units.container";
import { unitsColumns, unitsData } from "../description/units.description";

const Units = () => {
  const { isDrawerOpen, setDrawerOpen, actionsBtn } = UnitsContainer();

  return (
    <div className="products-catagories-section">
      <Navbar
        title="Units"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Units"
        openCanvas={() => setDrawerOpen(true)}
      />

      <div className="product-category-table">
        <DynamicTable
          columns={unitsColumns}
          data={unitsData}
          actions={actionsBtn}
        />
      </div>

      <AddUnits
        isDrawerOpen={isDrawerOpen}
        setDrawerOpen={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default Units;
