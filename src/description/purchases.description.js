export const addPurchaseColumns = [
  {
    label: "Product",
    accessor: (row) => `${row?.product_name || row?.product_name_en}`,
  },
  { label: "Variation", accessor: "variation_type_name" },
  { label: "Code", accessor: (row) => `${row?.product_code || row?.code}` },
  {
    label: "Price",
    accessor: (row) => `$ ${row?.product_price}`,
  },
  // { label: "Stock", accessor: "stock" },
  {
    label: "QTY",
    accessor: "qty",
    render: (row, handleQtyChange) => (
      <div>
        <button
          onClick={() => handleQtyChange(row, row?.qty - 1)}
          className="dynamic-calc-count-btn me-3"
          type="button"
        >
          -
        </button>
        <span>{row.qty}</span>
        <button
          onClick={() => handleQtyChange(row, row?.qty + 1)}
          className="dynamic-calc-count-btn ms-3"
          type="button"
        >
          +
        </button>
      </div>
    ),
  },
  { label: "Subtotal", accessor: (row) => `$ ${row?.subtotal}` },
];

export const options = [
  { value: "all", label: "For all branch" },
  { value: "doha", label: "doha" },
];

export const statusOptions = [
  { value: "received", label: "Received" },
  { value: "pending", label: "Pending" },
  { value: "ordered", label: "Ordered" },
];

export const purchaseTableColumns = [
  "Order Tax",
  "Discount",
  "Shipping",
  "Grand Total",
];

export const optionalAmountType = [
  { value: "$", label: "$" },
  { value: "%", label: "%" },
];

export const PurchaseTableInputs = [
  { fieldName: "orderTax", typeName: "orderTaxType" },
  { fieldName: "discount", typeName: "discountType" },
  { fieldName: "shipping", typeName: "shippingType" },
];
