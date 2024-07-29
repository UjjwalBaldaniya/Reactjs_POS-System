import DynamicTable from "../common/DynamicTable";
import Loader from "../common/Loader";
import Navbar from "../common/Navbar";
import ProductsContainer from "../container/products/products.container";
import { productsColumns } from "../description/products/products.description";

const Products = () => {
  const { actionsBtn, productsData, handleAdd, status } = ProductsContainer();

  if (status !== "succeeded") return <Loader />;

  return (
    <div>
      <Navbar
        title="Products"
        showNewAddBtn
        newAddBtnText="New Product"
        openCanvas={handleAdd}
      />

      <div className="product-table">
        <DynamicTable
          columns={productsColumns}
          data={productsData}
          actions={actionsBtn}
        />
      </div>
    </div>
  );
};

export default Products;
