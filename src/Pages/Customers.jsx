import DynamicTable from "../common/DynamicTable";
import Loader from "../common/Loader";
import Navbar from "../common/Navbar";
import CustomersContainer from "../container/customer/customers.container";
import { customerColumns } from "../description/customer.description";

const Customers = () => {
  const { handleAdd, actionsBtn, customersData, status } = CustomersContainer();

  if (status !== "succeeded") return <Loader />;

  return (
    <div>
      <Navbar
        title="Customers"
        showNewAddBtn
        newAddBtnText="Create Customer"
        openCanvas={handleAdd}
      />

      <div className="customer-table">
        <DynamicTable
          columns={customerColumns}
          data={customersData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default Customers;
