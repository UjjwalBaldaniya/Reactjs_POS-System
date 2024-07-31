import { formatTimestamp } from "../utils/functions/dateUtils";

export const purchaseReturnColumns = [
  { label: "Invoice No", accessor: "bill_id" },
  { label: "Supplier", accessor: (row) => row?.supplier?.name },
  {
    label: "Status",
    accessor: "status",
    getBgColor: (value) => {
      if (value === "pending") return "red";
      if (value === "received") return "green";
      return "yellow";
    },
  },
  { label: "Grand Total", accessor: (row) => `$ ${row?.return_grand_total}` },
  { label: "Items", accessor: (row) => row?.returns?.length },
  {
    label: "Created On",
    accessor: (row) => formatTimestamp(row?.return_date),
    bgColor: "blue",
  },
];

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
