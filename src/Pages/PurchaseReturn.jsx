import DynamicTable from "../common/DynamicTable";
import Loader from "../common/Loader";
import Navbar from "../common/Navbar";
import PurchaseReturnContainer from "../container/purchase/purchaseReturn.container";
import { purchaseReturnColumns } from "../description/purchaseReturn.description";

const PurchaseReturn = () => {
  const { actionsBtn, purchaseReturnData, status, handleAdd } =
    PurchaseReturnContainer();

  if (status !== "succeeded") return <Loader />;

  return (
    <div className="purchases-section">
      <Navbar
        title="Purchase Return"
        showNewAddBtn
        newAddBtnText="Add Purchase Return"
        openCanvas={handleAdd}
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
