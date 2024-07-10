export const options = [
  { value: "all", label: "For all branch" },
  { value: "doha", label: "doha" },
];

export const supplierOptions = [
  { value: "all", label: "For all branch" },
  { value: "doha", label: "doha" },
];

export const statusOptions = [
  { value: "received", label: "Received" },
  { value: "pending", label: "Pending" },
  { value: "ordered", label: "Ordered" },
];

export const purchaseTableColumns = [
  "Order Tax",
  "Discount",
  "Shipping",
  "Grand Total",
];

export const optionalAmountType = [
  { value: "$", label: "$" },
  { value: "%", label: "%" },
];

export const PurchaseTableInputs = [
  { fieldName: "orderTax", typeName: "orderTaxType" },
  { fieldName: "discount", typeName: "discountType" },
  { fieldName: "shipping", typeName: "shippingType" },
];
