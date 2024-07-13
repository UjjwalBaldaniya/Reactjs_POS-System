export const addSalesColumns = [
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
