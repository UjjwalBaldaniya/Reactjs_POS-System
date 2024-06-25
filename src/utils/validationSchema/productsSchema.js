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
  category: Yup.object().required("Category is required"),
  unit: Yup.object().required("Product Unit is required"),
  itemType: Yup.object().required("Item Type is required"),
  supplier: Yup.string()
    .required("Supplier Name is required")
    .min(2, "Supplier Name is too short"),
  saleUnit: Yup.object().required("Sale Unit is required"),
  purchaseUnit: Yup.object().required("Purchase Unit is required"),
  barcodeSymbology: Yup.object().required("Barcode Symbology is required"),
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
  productType: Yup.object().required("Product Type is required"),
  productCost: Yup.number()
    .when("productType", {
      is: (productType) => productType?.value === "single",
      then: (schema) => schema.required("Product Cost is required"),
    })
    .min(0, "Product Cost must be greater than or equal to 0"),
  productPrice: Yup.number()
    .when("productType", {
      is: (productType) => productType?.value === "single",
      then: (schema) => schema.required("Product Price is required"),
    })
    .min(0, "Product Price must be greater than or equal to 0"),
  stock: Yup.number()
    .when("productType", {
      is: (productType) => productType?.value === "single",
      then: (schema) => schema.required("Stock is required"),
    })
    .min(1, "Stock must be greater than 0"),

  variations: Yup.object().when("productType", {
    is: (productType) => productType?.value === "variation",
    then: (schema) => schema.required("Variations is required"),
  }),
  // variationsType: Yup.array().when("productType", {
  //   is: (productType) => productType?.value === "variation",
  //   then: Yup.array()
  //     .of(Yup.string().required())
  //     .required("Variation Type is required"),
  // }),
  // options: Yup.array().of(
  //   Yup.object().shape({
  //     type: Yup.string().required("Variation Type is required"),
  //     name: Yup.string().required("Variation Name is required"),
  //     productCost: Yup.number()
  //       .required("Product Cost is required")
  //       .min(0, "Product Cost must be greater than or equal to 0"),
  //     productPrice: Yup.number()
  //       .required("Product Price is required")
  //       .min(0, "Product Price must be greater than or equal to 0"),
  //     availability: Yup.object().required("Availability is required"),
  //     stock: Yup.number().when("availability", {
  //       is: (availability) => availability?.value === "available",
  //       then: Yup.number()
  //         .required("Stock is required")
  //         .min(1, "Stock must be greater than 0"),
  //     }),
  //   })
  // ),
});
