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

export const purchasesFields = [
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
