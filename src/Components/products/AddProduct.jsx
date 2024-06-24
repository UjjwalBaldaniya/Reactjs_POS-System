import "@yaireo/tagify/dist/tagify.css"; // Import Tagify CSS
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import Select from "react-select";
import { cancelIcon, fileUploadIcon } from "../../assets/icons/product";
import Navbar from "../../common/Navbar";
import { getDropdownOptions } from "../../common/functions/getDropdownOptions";
import AddProductsContainer from "../../container/products/addProducts.container";
import {
  availabilityOption,
  barcodeSymbologyOption,
  itemTypeOption,
  productTypeOption,
} from "../../description/products/products.description";
import { productSchema } from "../../utils/validationSchema/productsSchema";

const AddProduct = () => {
  const {
    categoryOptions,
    baseUnitOptions,
    unitOptions,
    variationNameOptions,
    variationData,
    handleBack,
  } = AddProductsContainer();

  const initialValues = {
    availability: availabilityOption?.[0],
    barcodeSymbology: "",
    category: "",
    // images: [],
    itemType: "",
    options: [],
    productCode: "",
    productCost: "",
    productDescriptionArabic: "",
    productDescriptionEnglish: "",
    productNameArabic: "",
    productNameEnglish: "",
    productPrice: "",
    productType: "",
    purchaseUnit: "",
    saleUnit: "",
    stock: "",
    supplier: "",
    unit: "",
    variations: "",
    variationsType: [],
    uploadedImages: [],
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log("Form Values:", values);
    setSubmitting(false);
  };

  const handleFileUpload = (files, push) => {
    const filesArray = Array.from(files);
    filesArray.forEach((file) => {
      const dataUrl = { file };
      push(dataUrl);
    });
  };

  const handleDeleteImage = (index, remove) => {
    remove(index);
  };

  return (
    <div>
      <Navbar
        title="Add New Product"
        showExportBtn={false}
        showNewAddBtn={false}
        showBackBtn={true}
        handleBackBtn={() => handleBack()}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={productSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => {
          // console.log("🚀 ~ AddProduct ~ values:", values);
          const isVariationValuePresent = variationData?.some(
            (item) => item?._id === values?.variations?.value
          );

          const variationFilterData = variationData?.filter(
            (item) => item?._id === values?.variations?.value
          );

          const variationTypeOptions = getDropdownOptions(
            variationFilterData?.[0]?.variations_types,
            "_id",
            "name"
          );

          return (
            <Form>
              {/* <div>
              <label htmlFor="branch" className="formField-label">
                Branch
              </label>
              <Select
                id="branch-select"
                options={branchOptions}
                value={values.branch}
                onChange={(option) => setFieldValue("branch", option)}
              />
            </div> */}

              <div className="row mt-4">
                <div className="col-12 col-md">
                  <label
                    htmlFor="productNameEnglish"
                    className="formField-label"
                  >
                    Product Name (English)
                  </label>
                  <Field
                    type="text"
                    className={`formField-input ${
                      touched?.productNameEnglish && errors?.productNameEnglish
                        ? "form-control-invalid"
                        : ""
                    }`}
                    id="productNameEnglish"
                    name="productNameEnglish"
                    placeholder="Enter Product Name"
                  />
                  <ErrorMessage
                    name="productNameEnglish"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-12 col-md">
                  <label
                    htmlFor="productNameArabic"
                    className="formField-label"
                  >
                    Product Name (Arabic)
                  </label>
                  <Field
                    type="text"
                    // className="formField-input"
                    id="productNameArabic"
                    name="productNameArabic"
                    placeholder="Enter Product Name"
                    className={`formField-input ${
                      touched?.productNameArabic && errors?.productNameArabic
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="productNameArabic"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12 col-md">
                  <label htmlFor="category" className="formField-label">
                    Category
                  </label>
                  <Select
                    id="category"
                    name="category"
                    options={categoryOptions}
                    placeholder="Select Product Category"
                    value={values.category}
                    onChange={(option) => setFieldValue("category", option)}
                    className={`${
                      touched?.category && errors?.category
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-12 col-md">
                  <label htmlFor="unit" className="formField-label">
                    Product Unit
                  </label>
                  <Select
                    id="unit"
                    name="unit"
                    options={baseUnitOptions}
                    placeholder="Select Product Unit"
                    value={values.unit}
                    onChange={(option) => setFieldValue("unit", option)}
                    className={`${
                      touched?.unit && errors?.unit
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12 col-md">
                  <label htmlFor="itemType" className="formField-label">
                    Item Type
                  </label>
                  <Select
                    id="saleUnit"
                    name="itemType"
                    options={itemTypeOption}
                    placeholder="Select Item Type"
                    value={values.itemType}
                    onChange={(option) => setFieldValue("itemType", option)}
                    className={`${
                      touched?.itemType && errors?.itemType
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="itemType"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-12 col-md">
                  <label htmlFor="supplier" className="formField-label">
                    Supplier Name
                  </label>
                  <Field
                    type="text"
                    // className="formField-input"
                    className={`formField-input ${
                      touched?.supplier && errors?.supplier
                        ? "form-control-invalid"
                        : ""
                    }`}
                    id="supplier"
                    name="supplier"
                    placeholder="Enter Supplier Name"
                  />
                  <ErrorMessage
                    name="supplier"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-md">
                  <label htmlFor="saleUnit" className="formField-label">
                    Sale Unit
                  </label>
                  <Select
                    id="saleUnit"
                    name="saleUnit"
                    options={unitOptions}
                    placeholder="Select Sale Unit"
                    value={values.saleUnit}
                    onChange={(option) => setFieldValue("saleUnit", option)}
                    className={`${
                      touched?.saleUnit && errors?.saleUnit
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="saleUnit"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-12 col-md">
                  <label htmlFor="purchaseUnit" className="formField-label">
                    Purchase Unit
                  </label>
                  <Select
                    id="purchaseUnit"
                    name="purchaseUnit"
                    options={unitOptions}
                    placeholder="Select Purchase Unit"
                    value={values.purchaseUnit}
                    onChange={(option) => setFieldValue("purchaseUnit", option)}
                    className={`${
                      touched?.purchaseUnit && errors?.purchaseUnit
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="purchaseUnit"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <label htmlFor="barcodeSymbology" className="formField-label">
                    Barcode Symbology
                  </label>
                  <Select
                    id="barcodeSymbology"
                    name="barcodeSymbology"
                    options={barcodeSymbologyOption}
                    placeholder="Select Barcode Symbology"
                    value={values.barcodeSymbology}
                    onChange={(option) =>
                      setFieldValue("barcodeSymbology", option)
                    }
                    className={`${
                      touched?.barcodeSymbology && errors?.barcodeSymbology
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="barcodeSymbology"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col">
                  <label htmlFor="productCode" className="formField-label">
                    Code
                  </label>
                  <Field
                    type="text"
                    id="productCode"
                    name="productCode"
                    placeholder="Enter Product Code"
                    className={`formField-input ${
                      touched?.barcodeSymbology && errors?.barcodeSymbology
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="productCode"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="col-12 label-input mt-4">
                <label htmlFor="">Product Images</label>
                <div className="img-upload">
                  <p>Or drag images here</p>
                  <FieldArray name="uploadedImages">
                    {({ push, remove }) => (
                      <>
                        {values.uploadedImages?.length > 0 &&
                          values.uploadedImages?.map((image, index) => (
                            <div
                              className="img-upload-div d-flex position-relative "
                              key={index}
                            >
                              <img
                                className="img-fluid rounded-3 mx-2"
                                src={URL.createObjectURL(image?.file)}
                                alt={`Uploaded ${index + 1}`}
                              />
                              <button
                                type="button"
                                className="cancel-btn btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                onClick={() => handleDeleteImage(index, remove)}
                              >
                                {cancelIcon}
                              </button>
                            </div>
                          ))}
                        <div className="img-upload-div">
                          <button className="img-upload-btn" type="button">
                            {fileUploadIcon}
                            <label htmlFor="file-upload">
                              <span>Upload Images</span>
                            </label>
                            <input
                              id="file-upload"
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileUpload(e?.target?.files, push)
                              }
                              style={{ display: "none" }}
                            />
                          </button>
                        </div>
                      </>
                    )}
                  </FieldArray>
                </div>
              </div>

              <div className="row mt-4">
                <div className=" col-12 col-md">
                  <label
                    className="formField-label"
                    htmlFor="productDescriptionEnglish"
                  >
                    Product Description (English)
                  </label>
                  <Field
                    as="textarea"
                    rows={4}
                    id="productDescriptionEnglish"
                    name="productDescriptionEnglish"
                    aria-label="Product Option List"
                    placeholder="Enter Product Description"
                    className={`formField-textarea ${
                      touched?.productDescriptionEnglish &&
                      errors?.productDescriptionEnglish
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="productDescriptionEnglish"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="col-12 col-md">
                  <label
                    className="formField-label"
                    htmlFor="productDescriptionArabic"
                  >
                    Product Description (Arabic)
                  </label>
                  <Field
                    as="textarea"
                    rows={4}
                    id="productDescriptionArabic"
                    name="productDescriptionArabic"
                    aria-label="Product Option List"
                    placeholder="Enter Product Description"
                    className={`formField-textarea ${
                      touched?.productDescriptionArabic &&
                      errors?.productDescriptionArabic
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="productDescriptionArabic"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-6">
                  <label htmlFor="productType" className="formField-label">
                    Product Type
                  </label>
                  <Select
                    id="productType"
                    name="productType"
                    options={productTypeOption}
                    value={values.productType}
                    onChange={(option) => setFieldValue("productType", option)}
                    className={`${
                      touched?.productType && errors?.productType
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="productType"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              {values?.productType?.value === "single" && (
                <>
                  <div className="row mt-4">
                    <div className="col-12 col-md">
                      <label className="formField-label">Product Cost</label>
                      <div className="input-percentage">
                        <Field
                          type="text"
                          name="productCost"
                          className="formField-input-percentage"
                          placeholder="0.00"
                        />
                        <span className="input-symbol-percentage">$</span>
                      </div>
                      <ErrorMessage
                        name="productCost"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="col-12 col-md">
                      <label className="formField-label">Product Price</label>
                      <div className="input-percentage">
                        <Field
                          type="text"
                          name="productPrice"
                          className="formField-input-percentage"
                          placeholder="0.00"
                        />
                        <span className="input-symbol-percentage">$</span>
                      </div>
                      <ErrorMessage
                        name="productPrice"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-12 col-md-6 ">
                      <label htmlFor="availability" className="formField-label">
                        Availability
                      </label>
                      <Select
                        id="availability"
                        options={availabilityOption}
                        placeholder="Select Availability"
                        value={values.availability}
                        onChange={(option) =>
                          setFieldValue("availability", option)
                        }
                      />
                    </div>

                    {values?.availability?.value === "available" && (
                      <div className="col-12 col-md">
                        <label htmlFor="stock" className="formField-label">
                          Stock
                        </label>
                        <div className="row">
                          <div className="col-12 col-md">
                            <Field
                              type="number"
                              className="formField-input"
                              id="stock"
                              name="stock"
                              placeholder="Enter Stock"
                            />
                            <ErrorMessage
                              name="stock"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {values?.productType?.value === "variation" && (
                <>
                  <div className="row mt-4">
                    <div className="col-12 col-md-6">
                      <label htmlFor="variations" className="formField-label">
                        Variations
                      </label>
                      <Select
                        id="variations-select"
                        options={variationNameOptions}
                        value={values.variations}
                        onChange={(option) =>
                          setFieldValue("variations", option)
                        }
                      />
                    </div>

                    {isVariationValuePresent && (
                      <>
                        <div className="col-12 col-md-6">
                          <label
                            htmlFor="variationsType"
                            className="formField-label"
                          >
                            Variations Type
                          </label>
                          <Field name="variationsType">
                            {({ field, form }) => (
                              <Select
                                isMulti
                                name="variationsType"
                                options={variationTypeOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={variationTypeOptions?.filter((option) =>
                                  form.values.variationsType?.includes(
                                    option?.value
                                  )
                                )}
                                onChange={(selectedOptions) => {
                                  const selectedValues = selectedOptions
                                    ? selectedOptions?.map((option) => ({
                                        type: option?.value,
                                        name: option?.label,
                                      }))
                                    : [];
                                  form.setFieldValue(
                                    "variationsType",
                                    selectedValues?.map(
                                      (option) => option?.type
                                    )
                                  );

                                  const newOptions = [...values.options];
                                  selectedOptions?.forEach((option) => {
                                    if (
                                      !newOptions?.find(
                                        (opt) => opt?.type === option?.value
                                      )
                                    ) {
                                      newOptions?.push({
                                        type: option?.value,
                                        name: option?.label,
                                      });
                                    }
                                  });

                                  const removedOptions = newOptions?.filter(
                                    (opt) =>
                                      !selectedValues
                                        ?.map((option) => option?.type)
                                        ?.includes(opt?.type)
                                  );
                                  removedOptions?.forEach((opt) => {
                                    const index = newOptions?.findIndex(
                                      (o) => o?.type === opt?.type
                                    );
                                    newOptions?.splice(index, 1);
                                  });

                                  setFieldValue("options", newOptions);
                                }}
                              />
                            )}
                          </Field>
                        </div>
                      </>
                    )}
                  </div>

                  {values?.options?.map((option, index) => (
                    <div key={`option-${index}`} className="option-fields">
                      <div className="row mt-4">
                        <div className="col-12 col-md-6">
                          <label className="formField-label">
                            Variation Type
                          </label>
                          <Field
                            readOnly
                            type="text"
                            className="formField-input"
                            value={option?.name}
                            style={{ opacity: "0.5" }}
                          />
                          <ErrorMessage
                            name={`options[${index}].productCost`}
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-12 col-md">
                          <label className="formField-label">
                            Product Cost
                          </label>
                          <div className="input-percentage">
                            <Field
                              type="text"
                              name={`options[${index}].productCost`}
                              className="formField-input-percentage"
                              placeholder="0.00"
                            />
                            <span className="input-symbol-percentage">$</span>
                          </div>
                          <ErrorMessage
                            name={`options[${index}].productCost`}
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="col-12 col-md">
                          <label className="formField-label">
                            Product Price
                          </label>
                          <div className="input-percentage">
                            <Field
                              type="text"
                              name={`options[${index}].productPrice`}
                              className="formField-input-percentage"
                              placeholder="0.00"
                            />
                            <span className="input-symbol-percentage">$</span>
                          </div>
                          <ErrorMessage
                            name={`options[${index}].productPrice`}
                            component="div"
                            className="error"
                          />
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-12 col-md-6">
                          <label
                            htmlFor={`options[${index}].availability`}
                            className="formField-label"
                          >
                            Availability
                          </label>
                          <Select
                            id={`options[${index}].availability`}
                            options={availabilityOption}
                            placeholder="Select Availability"
                            value={values.options[index]?.availability}
                            onChange={(option) =>
                              setFieldValue(
                                `options[${index}].availability`,
                                option
                              )
                            }
                          />
                        </div>

                        {values?.options[index]?.availability?.value ===
                          "available" && (
                          <div className="col-12 col-md-6">
                            <label
                              htmlFor={`options[${index}].stock`}
                              className="formField-label"
                            >
                              Stock
                            </label>
                            <div className="row">
                              <div className="col-12 col-md">
                                <Field
                                  type="text"
                                  className="formField-input"
                                  id={`options[${index}].stock`}
                                  name={`options[${index}].stock`}
                                  placeholder="Enter Stock"
                                />
                                <ErrorMessage
                                  name={`options[${index}].stock`}
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div className="my-5">
                <button
                  className="product-optionlist-btn mt-3 create-product"
                  type="submit"
                >
                  Create Product
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddProduct;
