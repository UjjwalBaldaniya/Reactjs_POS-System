import DynamicTable from "../common/DynamicTable";
import Loader from "../common/Loader";
import Navbar from "../common/Navbar";
import PurchasesContainer from "../container/purchase/purchases.container";

const Purchases = () => {
  const { actionsBtn, handleAdd, purchaseData, purchasesColumns, status } =
    PurchasesContainer();

  if (status !== "succeeded") return <Loader />;

  return (
    <div className="purchases-section">
      <Navbar
        title="Purchases"
        showNewAddBtn
        newAddBtnText="Add Purchases"
        openCanvas={handleAdd}
      />

      <div className="purchases-table">
        <DynamicTable
          columns={purchasesColumns}
          data={purchaseData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default Purchases;
