export const unitsColumns = [
  { label: "Name", accessor: "name" },
  { label: "Short Name", accessor: "shortName", bgColorGreen: true },
  { label: "Base Unit", accessor: "baseUnit", bgColorBlue: true },
];

export const unitsData = [
  {
    name: "pcs",
    shortName: "pcs",
    baseUnit: "piece",
  },
  {
    name: "leter",
    shortName: "L",
    baseUnit: "Liter",
  },
  {
    name: "Hi",
    shortName: "ETDM",
    baseUnit: "meter",
  },
  {
    name: "4 kg",
    shortName: "3 kg",
    baseUnit: "kilogram",
  },
  {
    name: "Packing",
    shortName: "pic",
    baseUnit: "piece",
  },
  {
    name: "Unit",
    shortName: "Unt",
    baseUnit: "piece",
  },
];

export const unitsFields = [
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
