export const suppliersColumns = [
  {
    label: "Supplier",
    accessor: "name",
  },
  {
    label: "Email",
    accessor: "email",
  },
  {
    label: "Phone No",
    accessor: "phoneno",
  },
  {
    label: "Location",
    accessor: (row) => `${row?.city}, ${row?.country}`,
  },
];

export const supplierFormField = [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Enter Supplier Name",
    mainClassName: "col-md-6",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter Supplier Email",
    mainClassName: "col-md-6 mt-3 mt-md-0",
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    type: "number",
    placeholder: "Enter Supplier number",
    mainClassName: "col-md-6 mt-3",
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    placeholder: "Enter Supplier Address",
    mainClassName: "col-md-6 mt-3",
  },
  {
    label: "City",
    name: "city",
    type: "text",
    placeholder: "Enter Supplier City",
    mainClassName: "col-md-6 mt-3",
  },
  {
    label: "Country",
    name: "country",
    type: "text",
    placeholder: "Enter Supplier Country",
    mainClassName: "col-md-6 mt-3",
  },
];
