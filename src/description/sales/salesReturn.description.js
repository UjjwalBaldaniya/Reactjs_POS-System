export const salesReturnColumns = [
  { label: "Reference", accessor: "reference" },
  { label: "Customer", accessor: "customer" },
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
  { label: "Payment Status", accessor: "paymentStatus" },
  { label: "Paid", accessor: "paid" },
  {
    label: "Payment Type",
    accessor: "paymentType",
    getBgColor: (value) => {
      if (value === "Bank Transfer") return "yellow";
      return "blue";
    },
    // bgColor: "blue",
  },
  { label: "Created On", accessor: "createdOn" },
];
