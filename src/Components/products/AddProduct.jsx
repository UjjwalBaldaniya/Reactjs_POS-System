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
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../../api/services/productService";
import { fetchProducts } from "../../redux/slice/product.slice";
import {
  ProductPercentageField,
  ProductSelectField,
  ProductTextAreaField,
  ProductTextField,
} from "../../common/ProductFromField";

const AddProduct = () => {
  const {
    categoryOptions,
    baseUnitOptions,
    unitOptions,
    variationNameOptions,
    variationData,
    handleBack,
  } = AddProductsContainer();

  const dispatch = useDispatch();
  const { isEdit, productDataById } = useSelector((state) => state?.product);

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

  const onSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    setSubmitting(true);

    const newValue = {
      product_name_en: values.productNameEnglish,
      product_name_ar: values.productNameArabic,
      category_id: values.category?.value,
      unit_id: values.unit?.value,
      barcode_symbol: values.barcodeSymbology?.value,
      code: values.productCode,
      product_description_en: values.productDescriptionEnglish,
      product_description_ar: values.productDescriptionArabic,
      images: values.uploadedImages?.[0]?.file,
      product_type: values.productType?.value,
      product_cost: values.productCost,
      product_price: values.productPrice,
      availability: values.availability?.value === "available" ? true : false,
      stock: values.stock,
    };
    // console.log("🚀 ~ onSubmit ~ newValue:", newValue);

    const formData = new FormData();
    formData.append("product_name_en", values.productNameEnglish);
    formData.append("product_name_ar", values.productNameArabic);
    formData.append("category_id", values.category?.value);
    formData.append("unit_id", values.unit?.value);
    formData.append("barcode_symbol", values.barcodeSymbology?.value);
    formData.append("code", values.productCode);
    formData.append("product_description_en", values.productDescriptionEnglish);
    formData.append("product_description_ar", values.productDescriptionArabic);
    formData.append("images", values.uploadedImages?.[0]?.file);
    formData.append("product_type", values.productType?.value);
    formData.append("single_details[product_cost]", values.productCost);
    formData.append("single_details[product_price]", values.productPrice);
    formData.append(
      "single_details[availability]",
      values.availability?.value === "available" ? true : false
    );
    formData.append("single_details[stock]", values.stock);

    try {
      const response = isEdit
        ? await editProduct(productDataById?._id, formData)
        : await addProduct(formData);

      if (response) {
        resetForm();
        dispatch(fetchProducts());
      }
    } catch (error) {
      setFieldError(
        "general",
        error.response?.data?.msg || "An error occurred"
      );
    }
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
                />
                <ProductSelectField
                  label="Product Unit"
                  name="unit"
                  options={baseUnitOptions}
                  placeholder="Select Product Unit"
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
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
                />
                <ProductSelectField
                  label="Purchase Unit"
                  name="purchaseUnit"
                  options={unitOptions}
                  placeholder="Select Purchase Unit"
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                />
              </div>

              <div className="row mt-4">
                <ProductSelectField
                  label="Barcode Symbology"
                  name="barcodeSymbology"
                  options={barcodeSymbologyOption}
                  placeholder="Select Barcode Symbology"
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
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
                />
              </div>

              {values?.productType?.value === "single" && (
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

              {values?.productType?.value === "variation" && (
                <>
                  <div className="row mt-4">
                    <ProductSelectField
                      label="Variations"
                      name="variations"
                      options={variationNameOptions}
                      placeholder="Select Variations"
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                    />

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
