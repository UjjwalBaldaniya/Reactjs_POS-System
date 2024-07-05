import { DatePicker } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import Select from "react-select";
import { plusIcon } from "../../assets/icons/tables";
import DynamicCalculateTable from "../../common/DynamicCalculateTable";
import Navbar from "../../common/Navbar";
import AddPurchasesContainer from "../../container/purchase/addPurchases.container";
import "../../css/purchase.css";
import {
  addPurchaseColumns,
  options,
  purchaseTableColumns,
  statusOptions,
} from "../../description/purchases.description";

const AddPurchases = () => {
  const {
    handleBack,
    actionsBtn,
    initialValues,
    handleSubmit,
    handleInputChange,
    setProductTableData,
    handleChange,
    productTableData,
    calculateTotals,
    preventNegative,
  } = AddPurchasesContainer();

  return (
    <div>
      <Navbar
        title="Add Purchases"
        showBackBtn={true}
        handleBackBtn={() => handleBack()}
      />

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue, values }) => {
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

          return (
            <Form>
              <div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="date" className="formField-label">
                      Date:
                    </label>
                    <DatePicker
                      onChange={(_, dateString) =>
                        setFieldValue("date", dateString)
                      }
                      className="formField-input"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="supplier" className="formField-label">
                      Supplier:
                    </label>
                    <Select
                      id="supplier"
                      options={options}
                      onChange={(option) => setFieldValue("supplier", option)}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="formField-label">Product:</label>
                  <Field name="search">
                    {({ field }) => (
                      <Select
                        {...field}
                        options={values.options}
                        inputValue={values.inputValue}
                        onInputChange={(newValue, actionMeta) => {
                          if (
                            actionMeta.action !== "input-blur" &&
                            actionMeta.action !== "menu-close"
                          ) {
                            handleInputChange(newValue, setFieldValue);
                          }
                        }}
                        onChange={(option) => {
                          handleChange(option, setFieldValue);
                        }}
                        isClearable
                        menuIsOpen={values.inputValue?.length > 0}
                        placeholder="Search Product by Name"
                      />
                    )}
                  </Field>
                </div>

                <div className="mt-4">
                  <label className="formField-label">Order Items:</label>
                  <DynamicCalculateTable
                    columns={addPurchaseColumns}
                    data={productTableData}
                    setData={setProductTableData}
                    actions={actionsBtn}
                  />
                </div>

                <div className="purchase-table-container">
                  <div className="purchase-table mt-4">
                    <div className="purchase-table-key col">
                      {purchaseTableColumns?.map((data, index) => (
                        <div key={index}>
                          <p>{data}</p>
                        </div>
                      ))}
                    </div>
                    <div className="purchase-table-key col">
                      <div className="input-per-table">
                        <Field name="orderTax">
                          {({ field }) => (
                            <input
                              {...field}
                              type="number"
                              className="formField-input-per-table"
                              placeholder="0.00"
                              disabled={productTableData?.length === 0}
                              onChange={(event) =>
                                preventNegative(
                                  event,
                                  setFieldValue,
                                  "orderTax"
                                )
                              }
                            />
                          )}
                        </Field>
                        <select
                          className="input-symbol-per-table"
                          name="orderTaxType"
                          value={values.orderTaxType}
                          onChange={(e) =>
                            setFieldValue("orderTaxType", e?.target?.value)
                          }
                        >
                          <option value="%">%</option>
                          <option value="$">$</option>
                        </select>
                      </div>
                      <div className="input-per-table">
                        <Field name="discount">
                          {({ field }) => (
                            <input
                              {...field}
                              type="number"
                              className="formField-input-per-table"
                              placeholder="0.00"
                              disabled={productTableData?.length === 0}
                              onChange={(event) =>
                                preventNegative(
                                  event,
                                  setFieldValue,
                                  "discount"
                                )
                              }
                            />
                          )}
                        </Field>
                        <select
                          className="input-symbol-per-table"
                          name="discountType"
                          value={values.discountType}
                          onChange={(e) =>
                            setFieldValue("discountType", e?.target?.value)
                          }
                        >
                          <option value="%">%</option>
                          <option value="$">$</option>
                        </select>
                      </div>
                      <div className="input-per-table border-bottom">
                        <Field name="shipping">
                          {({ field }) => (
                            <input
                              {...field}
                              type="number"
                              className="formField-input-per-table"
                              placeholder="0.00"
                              disabled={productTableData?.length === 0}
                              onChange={(event) =>
                                preventNegative(
                                  event,
                                  setFieldValue,
                                  "shipping"
                                )
                              }
                            />
                          )}
                        </Field>
                        <select
                          className="input-symbol-per-table "
                          value={values.shippingType}
                          name="shippingType"
                          onChange={(e) =>
                            setFieldValue("shippingType", e?.target?.value)
                          }
                        >
                          <option value="%">%</option>
                          <option value="$">$</option>
                        </select>
                      </div>
                    </div>
                    <div className="col purchase-table-key purchase-table-end">
                      <div>
                        {values.orderTaxType === "%" ? (
                          <p>{`$ ${taxAmount} ( ${
                            values?.orderTax || 0
                          }% )`}</p>
                        ) : (
                          <p>{`$ ${taxAmount}`}</p>
                        )}
                      </div>
                      <div>
                        {values.discountType === "%" ? (
                          <p>{`$ ${discountAmount} ( ${
                            values?.discount || 0
                          }% )`}</p>
                        ) : (
                          <p>{`$ ${discountAmount}`}</p>
                        )}
                      </div>
                      <div>
                        {values.shippingType === "%" ? (
                          <p>{`$ ${shippingAmount} ( ${
                            values?.shipping || 0
                          }% )`}</p>
                        ) : (
                          <p>{`$ ${shippingAmount}`}</p>
                        )}
                      </div>
                      <div>
                        <p>{`$ ${grandTotal?.toFixed(2)}`}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-6">
                    <label htmlFor="status" className="formField-label">
                      Status:
                    </label>
                    <Select
                      id="status"
                      name="status"
                      options={statusOptions}
                      value={values.status}
                      onChange={(option) => setFieldValue("status", option)}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="formField-label">Note:</label>
                  <Field
                    as="textarea"
                    className="formField-textarea"
                    rows={4}
                    id="note"
                    name="note"
                    placeholder="Enter notes"
                  />
                  <ErrorMessage
                    name="note"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="add-table-create-btn my-4">
                <button type="submit" disabled={isSubmitting}>
                  {plusIcon("white")}
                  <span className="ms-2">Save</span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddPurchases;
