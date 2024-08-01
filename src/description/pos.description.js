export const posColumns = [
  {
    label: "Product",
    accessor: (row) => `${row?.product_name || row?.product_name_en}`,
  },
  {
    label: "Variation",
    accessor: (row) => `${row?.variation_type_name || "-"}`,
  },
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
