export const salesColumns = [
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

export const salesData = [
  {
    reference: "PR_11110",
    customer: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paid: "$500",
    paymentStatus: "Paid",
    paymentType: "Bank Transfer",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    customer: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paid: "$500",
    paymentStatus: "Paid",
    paymentType: "Bank Transfer",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    customer: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paid: "$500",
    paymentStatus: "Paid",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    customer: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paid: "$500",
    paymentStatus: "Paid",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    customer: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paid: "$500",
    paymentStatus: "Paid",
    paymentType: "Bank Transfer",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    customer: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paid: "$500",
    paymentStatus: "Paid",
    paymentType: "Cash",
    createdOn: "12:11 PM 2022-07-27",
  },
  {
    reference: "PR_11110",
    customer: "fournisseur_1",
    warehouse: "warehouse",
    status: "Received",
    grandTotal: "$1500000.00",
    paid: "$500",
    paymentStatus: "paid",
    paymentType: "Bank Transfer",
    createdOn: "12:11 PM 2022-07-27",
  },
];

export const salesFields = [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "name",
  },
  {
    label: "Short Name",
    name: "shortName",
    type: "text",
    placeholder: "short name",
  },
  {
    label: "Base Unit",
    name: "baseUnit",
    type: "text",
    placeholder: "base unit",
  },
];
