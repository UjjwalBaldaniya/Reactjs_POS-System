import * as Yup from "yup";

export const supplierSchema = Yup.object().shape({
  name: Yup.string().required("Supplier Name is required"),
  email: Yup.string().required("Supplier Email is required"),
  phoneNumber: Yup.string().required("Supplier Number is required"),
  country: Yup.string().required("Supplier Country is required"),
  city: Yup.string().required("Supplier City is required"),
  address: Yup.string().required("Supplier Address is required"),
});

export const customerSchema = Yup.object().shape({
  name: Yup.string().required("Customer Name is required"),
  email: Yup.string().required("Customer Email is required"),
  phoneNumber: Yup.string().required("Customer Number is required"),
  country: Yup.string().required("Customer Country is required"),
  city: Yup.string().required("Customer City is required"),
  address: Yup.string().required("Customer Address is required"),
});
