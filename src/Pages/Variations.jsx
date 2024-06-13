import React from "react";
import Navbar from "../common/Navbar";
import DynamicTable from "../common/DynamicTable";
import variationsContainer from "../container/variations.container";
import {
  variationColumns,
  variationData,
} from "../description/variations.description";

const Variations = () => {
  const { actionsBtn } = variationsContainer();

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
          columns={variationColumns}
          data={variationData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default Variations;
