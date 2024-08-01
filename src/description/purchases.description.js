export const addPurchaseColumns = [
  {
    label: "Product",
    accessor: (row) => `${row?.product_name || row?.product_name_en}`,
  },
  {
    label: "Variation",
    accessor: (row) => `${row?.variation_type_name || "-"}`,
  },
  { label: "Code", accessor: (row) => `${row?.product_code || row?.code}` },
  {
    label: "Price",
    accessor: (row) => `$ ${row?.product_price}`,
  },
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
export const hasReturnColumn = [
  {
    label: "Product",
    accessor: (row) => `${row?.product_name || row?.product_name_en}`,
  },
  {
    label: "Variation",
    accessor: (row) => `${row?.variation_type_name || "-"}`,
  },
  { label: "Code", accessor: (row) => `${row?.product_code || row?.code}` },
  {
    label: "Price",
    accessor: (row) => `$ ${row?.product_price}`,
  },
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
  {
    label: "Return Qty",
    accessor: "return_qty",
  },
  {
    label: "Subtotal",
    accessor: (row) =>
      `$ ${row?.return_subtotal ? row?.subtotal - row?.return_subtotal : row?.subtotal}`,
  },
];

export const purchaseReturnDetailsColumn = [
  {
    label: "Product",
    accessor: (row) => `${row?.product_name || row?.product_name_en}`,
  },
  {
    label: "Variation",
    accessor: (row) => `${row?.variation_type_name || "-"}`,
  },
  { label: "Code", accessor: (row) => `${row?.product_code || row?.code}` },
  {
    label: "Price",
    accessor: (row) => `$ ${row?.product_price}`,
  },
  {
    label: "Return Qty",
    accessor: "qty",
  },
  {
    label: "Subtotal",
    accessor: (row) => `$ ${row?.subtotal}`,
  },
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

export const purchaseTableInputs = [
  { fieldName: "orderTax", typeName: "orderTaxType" },
  { fieldName: "discount", typeName: "discountType" },
  { fieldName: "shipping", typeName: "shippingType" },
];
