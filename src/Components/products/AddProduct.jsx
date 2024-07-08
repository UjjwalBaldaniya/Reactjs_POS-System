import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import Select from "react-select";
import { cancelIcon, fileUploadIcon } from "../../assets/icons/product";
import CommonButton from "../../common/CommonButton";
import Navbar from "../../common/Navbar";
import {
  ProductPercentageField,
  ProductSelectField,
  ProductTextAreaField,
  ProductTextField,
} from "../../common/ProductFromField";
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
    initialValues,
    onSubmit,
    handleFileUpload,
    handleDeleteImage,
  } = AddProductsContainer();

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
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors, touched, isSubmitting }) => {
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
                <ProductTextField
                  label="Product Name (English)"
                  name="productNameEnglish"
                  placeholder="Enter Product Name"
                  touched={touched}
                  errors={errors}
                />
                <ProductTextField
                  label="Product Name (Arabic)"
                  name="productNameArabic"
                  placeholder="Enter Product Name"
                  touched={touched}
                  errors={errors}
                />
              </div>

              <div className="row mt-4">
                <ProductSelectField
                  label="Category"
                  name="category"
                  options={categoryOptions}
                  placeholder="Select Product Category"
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  value={values?.category}
                />
                <ProductSelectField
                  label="Product Base-Unit"
                  name="productBaseUnit"
                  options={baseUnitOptions}
                  placeholder="Select Product Base-Unit"
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  value={values?.productBaseUnit}
                />
              </div>

              <div className="row mt-4">
                <ProductSelectField
                  label="Item Type"
                  name="itemType"
                  options={itemTypeOption}
                  placeholder="Select Item Type"
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  value={values?.itemType}
                />
                <ProductTextField
                  label="Supplier Name"
                  name="supplier"
                  placeholder="Enter Supplier Name"
                  touched={touched}
                  errors={errors}
                />
              </div>
              <div className="row mt-4">
                <ProductSelectField
                  label="Sale Unit"
                  name="saleUnit"
                  options={unitOptions}
                  placeholder="Select Sale Unit"
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  value={values?.saleUnit}
                />
                <ProductSelectField
                  label="Purchase Unit"
                  name="purchaseUnit"
                  options={unitOptions}
                  placeholder="Select Purchase Unit"
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  value={values?.purchaseUnit}
                />
              </div>

              <div className="row mt-4">
                <ProductSelectField
                  label="Barcode Symbology"
                  name="barcodeSymbology"
                  options={barcodeSymbologyOption}
                  placeholder="Select Barcode Symbology"
                  setFieldValue={setFieldValue}
                  className="z-3"
                  touched={touched}
                  errors={errors}
                  value={values?.barcodeSymbology}
                />
                <ProductTextField
                  label="Code"
                  name="productCode"
                  placeholder="Enter Product Code"
                  touched={touched}
                  errors={errors}
                />
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
                                className="img-fluid rounded-3  w-100"
                                src={
                                  image?.file?.includes("blob")
                                    ? image?.file
                                    : `${process.env.REACT_APP_IMG_URL}${image?.file}`
                                }
                                alt={`Uploaded ${index + 1}`}
                              />

                              <button
                                type="button"
                                className="cancel-btn btn btn-danger btn-sm position-absolute top-0 end-0 m-2 me-3"
                                onClick={() =>
                                  handleDeleteImage(index, remove, image?.id)
                                }
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
                <ProductTextAreaField
                  label="Product Description (English)"
                  name="productDescriptionEnglish"
                  placeholder="Enter Product Description"
                  touched={touched}
                  errors={errors}
                />
                <ProductTextAreaField
                  label="Product Description (Arabic)"
                  name="productDescriptionArabic"
                  placeholder="Enter Product Description"
                  touched={touched}
                  errors={errors}
                />
              </div>

              <div className="row mt-4">
                <ProductSelectField
                  label="Product Type"
                  name="productType"
                  options={productTypeOption}
                  placeholder="Select Product Type"
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  value={values?.productType}
                />
              </div>

              {(values?.productType?.value || values?.productType) ===
                "Single" && (
                <>
                  <div className="row mt-4">
                    <ProductPercentageField
                      label="Product Cost"
                      name="productCost"
                      placeholder="0.00"
                      touched={touched}
                      errors={errors}
                      symbol="$"
                    />
                    <ProductPercentageField
                      label="Product Price"
                      name="productPrice"
                      placeholder="0.00"
                      touched={touched}
                      errors={errors}
                      symbol="$"
                    />
                  </div>

                  <div className="row mt-4">
                    <div className="col-12 col-md-6 ">
                      <label htmlFor="availability" className="formField-label">
                        Availability
                      </label>
                      <Select
                        id="availability"
                        name="availability"
                        options={availabilityOption}
                        placeholder="Select Availability"
                        value={values.availability}
                        onChange={(option) =>
                          setFieldValue("availability", option)
                        }
                      />
                      <ErrorMessage
                        name="availability"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {values?.availability?.value === "available" && (
                      <ProductTextField
                        label="Stock"
                        name="stock"
                        placeholder="Enter Stock"
                        touched={touched}
                        errors={errors}
                      />
                    )}
                  </div>
                </>
              )}

              {values?.productType?.value === "Variation" && (
                <>
                  <div className="row mt-4">
                    <div className="col-12 col-md-6">
                      <label htmlFor="variations" className="formField-label">
                        Variations
                      </label>
                      <Select
                        id="variations"
                        name="variations"
                        options={variationNameOptions}
                        placeholder="Select Variation"
                        onChange={(option) => {
                          if (
                            values.variations &&
                            option.value !== values.variations.value
                          ) {
                            const newOptions = [];
                            setFieldValue("options", newOptions);
                            setFieldValue("variationsType", newOptions);
                          }
                          setFieldValue("variations", option);
                        }}
                        value={values.variations}
                        className={`${
                          touched?.variations && errors?.variations
                            ? "form-control-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="variations"
                        component="div"
                        className="text-danger"
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
                              <>
                                <Select
                                  {...field}
                                  isMulti
                                  id="variationsType"
                                  name="variationsType"
                                  options={variationTypeOptions}
                                  className={`basic-multi-select ${
                                    touched?.variationsType &&
                                    errors?.variationsType
                                      ? "form-control-invalid"
                                      : ""
                                  }`}
                                  classNamePrefix="select"
                                  value={variationTypeOptions?.filter(
                                    (option) =>
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
                                          availability: availabilityOption?.[0],
                                          productCost: "",
                                          productPrice: "",
                                          stock: "",
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
                                <ErrorMessage
                                  name="variationsType"
                                  component="div"
                                  className="text-danger"
                                />
                              </>
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
                        </div>
                      </div>
                      <div className="row mt-4">
                        <ProductPercentageField
                          label="Product Cost"
                          name={`options[${index}].productCost`}
                          placeholder="0.00"
                          symbol="$"
                        />
                        <ProductPercentageField
                          label="Product Price"
                          name={`options[${index}].productPrice`}
                          placeholder="0.00"
                          symbol="$"
                        />
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
                          <ProductTextField
                            label="Stock"
                            name={`options[${index}].stock`}
                            placeholder="Enter Stock"
                            touched={touched}
                            errors={errors}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div className="my-5">
                <CommonButton
                  isSubmitting={isSubmitting}
                  text="Create Product"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddProduct;
