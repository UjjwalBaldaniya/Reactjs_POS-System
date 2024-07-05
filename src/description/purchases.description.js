export const purchasesColumns = [
  { label: "Reference", accessor: "reference" },
  { label: "Supplier", accessor: "supplier" },
  { label: "WareHouse", accessor: "warehouse" },
  {
    label: "Status",
    accessor: "status",
    getBgColor: (value) => {
      if (value === "Pending") return "red";
      if (value === "Received") return "green";
      return "yellow";
    },
  },
  { label: "Grand Total", accessor: "grandTotal" },
  { label: "Payment Type", accessor: "paymentType", bgColor: "blue" },
  { label: "Created On", accessor: "createdOn" },
];

export const purchasesData = [
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Pending",
    grandTotal: "$1500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Ordered",
    grandTotal: "$1500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Ordered",
    grandTotal: "$1500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Pending",
    grandTotal: "$1500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Pending",
    grandTotal: "$1500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
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

export const addPurchaseColumns = [
  { label: "Product", accessor: "product_name_en" },
  { label: "Code", accessor: "code" },
  {
    label: "Net Unit Cost",
    accessor: (row) => `$ ${row?.single_details?.product_price}`,
  },
  { label: "Stock", accessor: (row) => row?.single_details?.stock },
  {
    label: "QTY",
    accessor: "qty",
    render: (row, handleQtyChange) => (
      <div>
        <button
          onClick={() => handleQtyChange(row, row?.qty - 1)}
          className="dynamic-calc-count-btn me-3"
        >
          -
        </button>
        <span>{row.qty}</span>
        <button
          onClick={() => handleQtyChange(row, row?.qty + 1)}
          className="dynamic-calc-count-btn ms-3"
        >
          +
        </button>
      </div>
    ),
  },

  { label: "Subtotal", accessor: "subtotal" },
];

export const purchaseTableColumns = [
  "Order Tax",
  "Discount",
  "Shipping",
  "Grand Total	",
];

export const optionalAmountType = [
  { value: "$", label: "$" },
  { value: "%", label: "%" },
];
