export const variationColumns = [
  { label: "Variation Name", accessor: "variations_name" },
  {
    label: "Variation Type",
    accessor: (row) =>
      row?.variations_types.map((type) => type.name).join(", "),
  },
];

export const variationFields = [
  {
    label: "Variation Name",
    name: "variationName",
    type: "text",
    placeholder: "variation name",
  },
  {
    label: "Variation Type",
    name: "variationType",
    type: "text",
    placeholder: "variation type",
  },
];
