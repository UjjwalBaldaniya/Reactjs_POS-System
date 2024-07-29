import DynamicTable from "../common/DynamicTable";
import Navbar from "../common/Navbar";
import PurchaseReturnContainer from "../container/purchase/purchaseReturn.container";
import {
  purchaseReturnColumns,
  purchaseReturnData,
} from "../description/purchaseReturn.description";

const PurchaseReturn = () => {
  const { actionsBtn, navigateToPurchaseReturn } = PurchaseReturnContainer();

  return (
    <div className="purchases-section">
      <Navbar
        title="Purchase Return"
        showNewAddBtn
        newAddBtnText="Add Purchase Return"
        openCanvas={navigateToPurchaseReturn}
      />

      <div className="purchases-table">
        <DynamicTable
          columns={purchaseReturnColumns}
          data={purchaseReturnData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default PurchaseReturn;
