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
    <div className="base-units-section">
      <Navbar
        title="Base Units"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Base Units"
        openCanvas={() => setDrawerOpen(true)}
      />

      <div className="base-units-table">
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
