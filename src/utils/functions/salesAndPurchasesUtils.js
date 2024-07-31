import { statusOptions } from "../../description/purchases.description";

export const getValueSignName = (value) => (value === "%" ? "per" : "doller");
export const getValueSign = (value) => (value === "per" ? "%" : "$");

export const preventNegative = (event, setFieldValue, name) => {
  const value = event?.target?.value;
  if (value < 0) setFieldValue(name, 1);
  else setFieldValue(name, value);
};

export const getStatusEditOptions = (value) =>
  statusOptions?.find((data) => data?.value === value);

export const calculateTotals = (
  currentProductData,
  orderTax,
  orderTaxType,
  discount,
  discountType,
  shipping,
  shippingType
) => {
  let grandTotal = currentProductData?.reduce(
    (accumulator, item) => accumulator + (parseFloat(item?.subtotal) || 0),
    0
  );

  let taxAmount = 0;
  if (orderTaxType === "%") {
    taxAmount = (grandTotal * (parseFloat(orderTax) || 0)) / 100;
  } else {
    taxAmount = parseFloat(orderTax) || 0;
  }
  grandTotal += taxAmount;

  let discountAmount = 0;
  if (discountType === "%") {
    discountAmount = (grandTotal * (parseFloat(discount) || 0)) / 100;
  } else {
    discountAmount = parseFloat(discount) || 0;
  }
  grandTotal -= discountAmount;

  let shippingAmount = 0;
  if (shippingType === "%") {
    shippingAmount = (grandTotal * (parseFloat(shipping) || 0)) / 100;
  } else {
    shippingAmount = parseFloat(shipping) || 0;
  }
  grandTotal += shippingAmount;

  return { grandTotal, taxAmount, discountAmount, shippingAmount };
};
