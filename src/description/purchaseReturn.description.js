export const addPurchaseReturnColumns = [
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
  {
    label: "QTY",
    accessor: "qty",
    render: (row, handleQtyChange) => (
      <div>
        <button
          onClick={() =>
            handleQtyChange(row, row?.qty - 1, row?.purchase_limit)
          }
          className="dynamic-calc-count-btn me-3"
          type="button"
        >
          -
        </button>
        <span>{row?.qty}</span>
        <button
          onClick={() =>
            handleQtyChange(row, row?.qty + 1, row?.purchase_limit)
          }
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

export const purchaseReturnColumns = [
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
  { label: "Paid", accessor: "paid" },
  { label: "Due", accessor: "due" },
  { label: "Payment Type", accessor: "paymentType", bgColor: "blue" },
  { label: "Created On", accessor: "createdOn" },
];

export const purchaseReturnData = [
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paid: "$1000000.00",
    due: "$500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Pending",
    grandTotal: "$1500000.00",
    paid: "$1000000.00",
    due: "$500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Ordered",
    grandTotal: "$1500000.00",
    paid: "$1000000.00",
    due: "$500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Ordered",
    grandTotal: "$1500000.00",
    paid: "$1000000.00",
    due: "$500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paid: "$1000000.00",
    due: "$500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Pending",
    grandTotal: "$1500000.00",
    paid: "$1000000.00",
    due: "$500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    supplier: "fournisseur_1",
    warehouse: "warehouse",
    status: "Pending",
    grandTotal: "$1500000.00",
    paid: "$1000000.00",
    due: "$500000.00",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
];
