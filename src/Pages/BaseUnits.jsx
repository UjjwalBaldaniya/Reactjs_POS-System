import DynamicTable from "../common/DynamicTable";
import Loader from "../common/Loader";
import Navbar from "../common/Navbar";
import AddBaseUnits from "../components/baseUnits/AddBaseUnits";
import BaseUnitsContainer from "../container/baseUnits/baseUnits.container";
import { baseUnitsColumns } from "../description/baseUnits.description";

const BaseUnits = () => {
  const { handleAdd, actionsBtn, baseUnitsData, isModalOpen, status } =
    BaseUnitsContainer();

  if (status !== "succeeded") return <Loader />;

  return (
    <div className="base-units-section">
      <Navbar
        title="Base Units"
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
