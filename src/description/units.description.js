export const unitsColumns = [
  { label: "Name", accessor: "unit_name" },
  { label: "Short Name", accessor: "unit_short_name", bgColor: "green" },
  {
    label: "Base Unit",
    accessor: (row) => row?.base_unit_id?.base_unit_name,
    bgColor: "blue",
  },
];
