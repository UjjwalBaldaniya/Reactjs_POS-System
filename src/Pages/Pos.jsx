import { Field, Form, Formik } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import cakeImage from "../assets/images/dashboard/cake.jpg";
import DynamicCalculateTable from "../common/DynamicCalculateTable";
import InputWithSelect from "../common/InputWithSelect";
import Loader from "../common/Loader";
import PosContainer from "../container/pos/pos.container";
import "../css/pos.css";
import { posColumns } from "../description/pos.description";
import {
  purchaseTableColumns,
  PurchaseTableInputs,
} from "../description/purchases.description";
import {
  calculateTotals,
  preventNegative,
} from "../utils/functions/salesAndPurchasesUtils";

const Pos = () => {
  const {
    initialValues,
    customerOption,
    actionsBtn,
    productTableData,
    categoryNames,
    categoryTabData,
    filteredProductList,
    status,
    handleSubmit,
    navigateToCustomer,
    setCountQty,
    handleTabClick,
    handleSearchInputChange,
    handleSearchChange,
    handleProductCardClick,
  } = PosContainer();

  if (status !== "succeeded") return <Loader />;

  return (
    <div className="pos">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => {
          // console.log("🚀 ~ Pos ~ values:", values);
          const { grandTotal, taxAmount, discountAmount, shippingAmount } =
            calculateTotals(
              productTableData,
              values?.orderTax,
              values?.orderTaxType,
              values?.discount,
              values?.discountType,
              values?.shipping,
              values?.shippingType
            );

          // getGrandTotal(grandTotal);

          const summaryData = [
            {
              amount: taxAmount,
              value: values.orderTax,
              type: values.orderTaxType,
            },
            {
              amount: discountAmount,
              value: values.discount,
              type: values.discountType,
            },
            {
              amount: shippingAmount,
              value: values.shipping,
              type: values.shippingType,
            },
            { amount: grandTotal?.toFixed(2), value: null, type: null },
          ];

          return (
            <Form>
              <div className="row">
                <div className="col-4">
                  <div
                    className="pos-left-section d-flex flex-column justify-content-between py-4"
                    style={{ height: "100vh" }}
                  >
                    <div>
                      <div>
                        <Select
                          id="customer"
                          options={customerOption}
                          value={values?.customer}
                          placeholder="Select Customer"
                          inputValue={values.customerInputValue}
                          onInputChange={(newValue) =>
                            setFieldValue("customerInputValue", newValue)
                          }
                          onChange={(option) =>
                            setFieldValue("customer", option)
                          }
                          onKeyDown={(e) =>
                            navigateToCustomer(e, values, customerOption)
                          }
                        />
                      </div>

                      <div
                        className="mt-4 pos-scroll"
                        style={{ maxHeight: "60vh", overflow: "auto" }}
                      >
                        <label className="formField-label">Order Items:</label>
                        <DynamicCalculateTable
                          columns={posColumns}
                          data={productTableData}
                          setData={setCountQty}
                          actions={actionsBtn}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="purchase-table-container">
                        <div
                          className="purchase-table mt-4"
                          style={{ width: "450px" }}
                        >
                          <div className="purchase-table-key col">
                            {purchaseTableColumns?.map((data, index) => (
                              <div key={index}>
                                <p>{data}</p>
                              </div>
                            ))}
                          </div>
                          <div className="purchase-table-key col">
                            {PurchaseTableInputs?.map((input, index) => (
                              <InputWithSelect
                                key={index}
                                fieldName={input?.fieldName}
                                typeName={input?.typeName}
                                values={values}
                                setFieldValue={setFieldValue}
                                productTableData={productTableData}
                                preventNegative={preventNegative}
                              />
                            ))}
                          </div>
                          <div className="col purchase-table-key purchase-table-end">
                            {summaryData?.map((item, index) => {
                              return (
                                <div key={index}>
                                  <p>
                                    {`$ ${item?.amount}`}{" "}
                                    {item?.type === "%" &&
                                      `( ${item?.value || 0}% )`}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                        <Button variant="secondary w-100">Hold</Button>
                        <Button variant="danger w-100">Reset</Button>
                        <Button variant="primary w-100">Pay Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-8">
                        <Field name="search">
                          {({ field, form }) => (
                            <Select
                              {...field}
                              options={form.values.options}
                              inputValue={form.values.searchInputValue}
                              onInputChange={(newValue, actionMeta) => {
                                if (
                                  actionMeta.action !== "input-blur" &&
                                  actionMeta.action !== "menu-close"
                                ) {
                                  handleSearchInputChange(
                                    newValue,
                                    form.setFieldValue
                                  );
                                }
                              }}
                              onChange={(option) =>
                                handleSearchChange(option, form.setFieldValue)
                              }
                              isClearable
                              menuIsOpen={
                                form.values.searchInputValue?.length > 0
                              }
                              placeholder="Search Product by Name & Code"
                            />
                          )}
                        </Field>
                      </div>
                      <div className="col-4"></div>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex overflow-auto gap-1">
                        {categoryNames?.map((name, index) => {
                          return (
                            <button
                              key={index}
                              type="button"
                              className={
                                categoryTabData === index
                                  ? "navbar-add-products"
                                  : "export-all"
                              }
                              onClick={() => handleTabClick(name, index)}
                            >
                              {name}
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-4">
                        <div className="pos-product-section">
                          <div className="d-flex flex-wrap gap-4">
                            {filteredProductList?.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className={`pos-product ${
                                    productTableData?.some(
                                      (dataItem) =>
                                        dataItem?.formatted_name ===
                                        item?.formatted_name
                                    )
                                      ? "pos-product-card-border"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleProductCardClick(item, index)
                                  }
                                >
                                  <img
                                    src={cakeImage}
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="pos-product-desc">
                                    <p className="pos-product-title">
                                      {item?.formatted_name}
                                    </p>
                                    <p className="pos-product-price">
                                      {`$ ${item?.product_price}.00`}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Pos;
