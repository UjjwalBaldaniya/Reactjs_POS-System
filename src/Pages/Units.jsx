import React from "react";
import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import AddUnits from "../components/units/AddUnits";
import UnitsContainer from "../container/units/units.container";
import { unitsColumns } from "../description/units.description";
import Loader from "../common/Loader";

const Units = () => {
  const { actionsBtn, handleAdd, unitsData, isModalOpen, status } =
    UnitsContainer();

  if (status !== "succeeded") return <Loader />;

  return (
    <div className="products-catagories-section">
      <Navbar
        title="Units"
        showExportBtn
        showNewAddBtn
        newAddBtnText="Add Units"
        openCanvas={handleAdd}
      />

      <div className="product-category-table">
        <DynamicTable
          columns={unitsColumns}
          data={unitsData}
          actions={actionsBtn}
        />
      </div>

      <AddUnits isModalOpen={isModalOpen} />
    </div>
  );
};

export default Units;
