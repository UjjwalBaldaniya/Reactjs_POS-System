import * as Yup from "yup";

export const baseUnitSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
});

export const unitSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  shortName: Yup.string().required("This field is required"),
  baseUnit: Yup.string().required("This field is required"),
});

export const variationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  variationTypes: Yup.array().of(
    Yup.string().required("Variation Type is required")
  ),
});

export const categorySchema = Yup.object({
  productCategory: Yup.string().required("Product Category is required"),
  productImage: Yup.mixed().required("Product Image is required"),
});

export const productSchema = Yup.object().shape({
  productNameEnglish: Yup.string()
    .required("Product Name (English) is required")
    .min(2, "Product Name (English) is too short"),
  productNameArabic: Yup.string()
    .required("Product Name (Arabic) is required")
    .min(2, "Product Name (Arabic) is too short"),
  category: Yup.mixed().required("Category is required"),
  productBaseUnit: Yup.mixed().required("Product Unit is required"),
  itemType: Yup.mixed().required("Item Type is required"),
  supplier: Yup.string()
    .required("Supplier Name is required")
    .min(2, "Supplier Name is too short"),
  saleUnit: Yup.mixed().required("Sale Unit is required"),
  purchaseUnit: Yup.mixed().required("Purchase Unit is required"),
  barcodeSymbology: Yup.mixed().required("Barcode Symbology is required"),
  productCode: Yup.string()
    .required("Product Code is required")
    .min(2, "Product Code is too short"),
  // uploadedImages: Yup.array().of(
  //   Yup.object().shape({
  //     file: Yup.mixed().required("A file is required"),
  //   })
  // ),
  productDescriptionEnglish: Yup.string()
    .required("Product Description (English) is required")
    .min(10, "Product Description (English) is too short"),
  productDescriptionArabic: Yup.string()
    .required("Product Description (Arabic) is required")
    .min(10, "Product Description (Arabic) is too short"),
  productType: Yup.mixed().required("Product Type is required"),
  productCost: Yup.number()
    .when("productType", {
      is: (productType) => productType?.value === "Single",
      then: (schema) => schema.required("Product Cost is required"),
    })
    .min(0, "Product Cost must be greater than or equal to 0"),
  productPrice: Yup.number()
    .when("productType", {
      is: (productType) => productType?.value === "Single",
      then: (schema) => schema.required("Product Price is required"),
    })
    .min(0, "Product Price must be greater than or equal to 0"),
  stock: Yup.number()
    .when("productType", {
      is: (productType) => productType?.value === "Single",
      then: (schema) => schema.required("Stock is required"),
    })
    .min(1, "Stock must be greater than 0"),

  variations: Yup.object().when("productType", {
    is: (productType) => productType?.value === "Variation",
    then: (schema) => schema.required("Variations is required"),
  }),

  variationsType: Yup.array()
    .of(Yup.string().matches(/^[0-9a-fA-F]{24}$/, "Invalid ID format"))
    .min(1, "At least one option must be selected")
    .required("Required"),

  options: Yup.array().of(
    Yup.object().shape({
      productCost: Yup.mixed().required("Product Cost is required"),
      productPrice: Yup.mixed().required("Product Price is required"),
    })
  ),
});
