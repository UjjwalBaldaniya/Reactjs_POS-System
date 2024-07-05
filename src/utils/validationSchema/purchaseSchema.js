import * as Yup from "yup";

export const purchaseSchema = Yup.object().shape({
  orderTax: Yup.number().min(0, "Must be greater than or equal to 0"),
  discount: Yup.number().moreThan(0, "Must be greater than 0"), // Ensure discount is greater than 0
  shipping: Yup.number().min(0, "Must be greater than or equal to 0"),
});
