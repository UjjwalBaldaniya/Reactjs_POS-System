import { categoryOptions } from "./products/products.description";

export const unitsColumns = [
  { label: "Name", accessor: "name" },
  { label: "Short Name", accessor: "shortName", bgColor: "green" },
  { label: "Base Unit", accessor: "baseUnit", bgColor: "blue" },
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
    placeholder: "Enter name",
  },
  {
    label: "Short Name",
    name: "shortName",
    type: "text",
    placeholder: "Enter short name",
  },
  {
    label: "Base Unit",
    name: "baseUnit",
    type: "select",
    placeholder: "Select base unit",
    options: categoryOptions?.map((option) => ({
      value: option.value,
      label: option.label,
    })),
  },
];
