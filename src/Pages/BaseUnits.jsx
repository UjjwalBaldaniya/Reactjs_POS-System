import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import AddBaseUnits from "../components/baseUnits/AddBaseUnits";
import baseUnitsContainer from "../container/baseUnits.container";
import { baseUnitsColumns } from "../description/baseUnits.description";

const BaseUnits = () => {
  const { handleAdd, actionsBtn, baseUnitsData, isModalOpen } =
    baseUnitsContainer();

  return (
    <div className="base-units-section">
      <Navbar
        title="Base Units"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Base Units"
        openCanvas={handleAdd}
      />

      <div className="base-units-table">
        <DynamicTable
          columns={baseUnitsColumns}
          data={baseUnitsData}
          actions={actionsBtn}
        />
      </div>

      <AddBaseUnits isModalOpen={isModalOpen} />
    </div>
  );
};

export default BaseUnits;
