import "@yaireo/tagify/dist/tagify.css"; // Import Tagify CSS
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import Select from "react-select";
import { cancelIcon, fileUploadIcon } from "../../assets/icons/product";
import Navbar from "../../common/Navbar";
import AddProductsContainer from "../../container/products/addProducts.container";
import {
  availabilityOption,
  barcodeSymbologyOption,
  categoryOptions,
  itemTypeOption,
  productTypeOption,
  unitOptions,
  variationOption,
  variationTypeOption,
} from "../../description/products/products.description";

const AddProduct = () => {
  const {
    selectedOption,
    setSelectedOption,
    handleBack,
    activeTime,
    handleTimeButtonClick,
    uploadedImages,
    handleDeleteImage,
    handleFileUpload,
    isInfiniteStock,
    handleInfiniteStock,
  } = AddProductsContainer();

  const initialValues = {
    productNameEn: "",
    productNameAr: "",
    category: "",
    productUnit: "",
    barcodeSymbology: "",
    productCode: "",
    preparationTime: "",
    availability: "",
    stock: "",
    images: [],
    productDescriptionEn: "",
    productDescriptionAr: "",
    productType: "",
    variations: "",
    variationsType: [],
    options: [],
  };

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log("Form Values:", values);
    setSubmitting(false);
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
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
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
                <label htmlFor="productNameEnglish" className="formField-label">
                  Product Name (English)
                </label>
                <Field
                  type="text"
                  className="formField-input"
                  id="productNameEnglish"
                  name="productNameEnglish"
                  placeholder="Enter Product Name"
                />
                <ErrorMessage
                  name="productNameEnglish"
                  component="div"
                  className="error"
                />
              </div>
              <div className="col-12 col-md">
                <label htmlFor="productNameArabic" className="formField-label">
                  Product Name (Arabic)
                </label>
                <Field
                  type="text"
                  className="formField-input"
                  id="productNameArabic"
                  name="productNameArabic"
                  placeholder="Enter Product Name"
                />
                <ErrorMessage
                  name="productNameArabic"
                  component="div"
                  className="error"
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
                  options={categoryOptions}
                  placeholder="Select Product Category"
                  value={values.category}
                  onChange={(option) => setFieldValue("category", option)}
                />
              </div>
              <div className="col-12 col-md">
                <label htmlFor="unit" className="formField-label">
                  Product Unit
                </label>
                <Select
                  id="unit"
                  options={unitOptions}
                  placeholder="Select Product Unit"
                  value={values.unit}
                  onChange={(option) => setFieldValue("unit", option)}
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
                  options={itemTypeOption}
                  placeholder="Select Item Type"
                  value={values.itemType}
                  onChange={(option) => setFieldValue("itemType", option)}
                />
              </div>
              <div className="col-12 col-md">
                <label htmlFor="supplier" className="formField-label">
                  Supplier Name
                </label>
                <Field
                  type="text"
                  className="formField-input"
                  id="supplier"
                  name="supplier"
                  placeholder="Enter Supplier Name"
                />
                <ErrorMessage
                  name="supplier"
                  component="div"
                  className="error"
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
                  options={categoryOptions}
                  placeholder="Select Sale Unit"
                  value={values.saleUnit}
                  onChange={(option) => setFieldValue("saleUnit", option)}
                />
              </div>
              <div className="col-12 col-md">
                <label htmlFor="purchaseUnit" className="formField-label">
                  Purchase Unit
                </label>
                <Select
                  id="purchaseUnit"
                  options={unitOptions}
                  placeholder="Select Purchase Unit"
                  value={values.purchaseUnit}
                  onChange={(option) => setFieldValue("purchaseUnit", option)}
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
                  options={barcodeSymbologyOption}
                  placeholder="Select Barcode Symbology"
                  value={values.barcodeSymbology}
                  onChange={(option) =>
                    setFieldValue("barcodeSymbology", option)
                  }
                />
              </div>
              <div className="col">
                <label htmlFor="productCode" className="formField-label">
                  Code
                </label>
                <Field
                  type="text"
                  className="formField-input"
                  id="productCode"
                  name="productCode"
                  placeholder="Enter Product Code"
                />
                <ErrorMessage
                  name="productCode"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <div className="col-12 label-input mt-4">
              <label htmlFor="">Product Images</label>
              <div className="img-uploade">
                <p>Or drag images here</p>
                {uploadedImages?.length !== 0 &&
                  uploadedImages.map((image, index) => (
                    <div className="img-upload-div d-flex position-relative ">
                      <img
                        className="img-fluid rounded-3 mx-2"
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded ${index + 1}`}
                      />
                      <button
                        className="cancel-btn btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                        onClick={() => handleDeleteImage(index)}
                      >
                        {cancelIcon}
                      </button>
                    </div>
                  ))}
                <div className="img-upload-div">
                  <button className="img-uploade-btn" type="button">
                    {fileUploadIcon}
                    <label htmlFor="file-upload" className="img-upload-btn">
                      <span>Upload Images</span>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      style={{ display: "none" }}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 mt-4">
              <div className="row">
                <div className=" col-12 col-md-6">
                  <div className="label-input">
                    <div className="input-div">
                      <div className="input-div-inner">
                        <label
                          className="text-area-label"
                          htmlFor="productDescriptionEnglish"
                        >
                          Product Description (English)
                        </label>
                        <Field
                          as="textarea"
                          className="text-area pb-5"
                          id="productDescriptionEnglish"
                          name="productDescriptionEnglish"
                          aria-label="Product Option List"
                          placeholder="Enter Product Description"
                        />
                        <ErrorMessage
                          name="productDescriptionEnglish"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 ">
                  <div className="label-input">
                    <div className="input-div">
                      <div className="input-div-inner">
                        <label
                          className="text-area-label"
                          htmlFor="productDescriptionArabic"
                        >
                          Product Description (Arabic)
                        </label>
                        <Field
                          as="textarea"
                          className="text-area pb-5"
                          id="productDescriptionArabic"
                          name="productDescriptionArabic"
                          aria-label="Product Option List"
                          placeholder="Enter Product Description"
                        />
                        <ErrorMessage
                          name="productDescriptionArabic"
                          component="div"
                          className="error"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-6">
                <label htmlFor="productType" className="formField-label">
                  Product Type
                </label>
                <Select
                  id="productType-select"
                  options={productTypeOption}
                  value={values.productType}
                  onChange={(option) => setFieldValue("productType", option)}
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
                            type="text"
                            className="formField-input"
                            id="stock"
                            name="stock"
                            placeholder="Enter Stock"
                            readOnly={isInfiniteStock}
                            style={{ opacity: isInfiniteStock ? 0.5 : 1 }}
                          />
                          <ErrorMessage
                            name="stock"
                            component="div"
                            className="error"
                          />
                        </div>
                        {/* <div className=" col-12 col-md">
                          <button
                            className={`formField-input ${
                              isInfiniteStock ? "infinite-click" : ""
                            }`}
                            type="button"
                            onClick={handleInfiniteStock}
                          >
                            Infinite Stock
                          </button>
                        </div> */}
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
                      options={variationOption}
                      value={values.variations}
                      onChange={(option) => setFieldValue("variations", option)}
                    />
                  </div>

                  {values?.variations?.value === "pizza" && (
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
                              options={variationTypeOption}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              value={variationTypeOption.filter((option) =>
                                form.values.variationsType.includes(
                                  option.value
                                )
                              )}
                              onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions
                                  ? selectedOptions.map(
                                      (option) => option.value
                                    )
                                  : [];
                                form.setFieldValue(
                                  "variationsType",
                                  selectedValues
                                );

                                // Ensure options array matches selected options
                                const newOptions = [...values.options];
                                selectedValues.forEach((value) => {
                                  if (
                                    !newOptions.find(
                                      (opt) => opt.type === value
                                    )
                                  ) {
                                    newOptions.push({ type: value });
                                  }
                                });
                                // Remove options that are no longer selected
                                const removedOptions = newOptions.filter(
                                  (opt) => !selectedValues.includes(opt.type)
                                );
                                removedOptions.forEach((opt) => {
                                  const index = newOptions.findIndex(
                                    (o) => o.type === opt.type
                                  );
                                  newOptions.splice(index, 1);
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
                          value={option?.type}
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
                        <label className="formField-label">Product Cost</label>
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
                        <label className="formField-label">Product Price</label>
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
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
