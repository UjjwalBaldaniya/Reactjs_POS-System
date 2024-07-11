import { DatePicker } from "antd";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CommonButton from "../../common/CommonButton";
import DynamicCalculateTable from "../../common/DynamicCalculateTable";
import InputWithSelect from "../../common/InputWithSelect";
import Navbar from "../../common/Navbar";
import AddPurchasesContainer from "../../container/purchase/addPurchases.container";
import "../../css/purchase.css";
import {
  purchaseTableColumns,
  PurchaseTableInputs,
  statusOptions,
} from "../../description/purchases.description";
import moment from "moment";
import dayjs from "dayjs";
import { formatTimestamp } from "../../utils/functions/dateUtils";

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
    AmountDisplay,
    supplierNavigate,
    supplierOption,
    getGrandTotal,
    isEdit,
    addPurchaseColumns,
    currentProductData,
    supplierDataById,
    loading,
  } = AddPurchasesContainer();

  // start

  if (loading !== "succeeded") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar
        title="Add Purchases"
        showBackBtn={true}
        handleBackBtn={() => handleBack()}
      />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => {
          console.log("🚀 ~ AddPurchases ~ values:", values);

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

          getGrandTotal(grandTotal);

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

          const dateFormat = "YYYY/MM/DD";
          const formattedDate = moment(values.date).format(dateFormat);

          return (
            <Form>
              <div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="date" className="formField-label">
                      Date:
                    </label>
                    <DatePicker
                      value={
                        values.date ? dayjs(formattedDate, dateFormat) : null
                      }
                      format={dateFormat}
                      onChange={(_, dateString) =>
                        setFieldValue("date", dateString)
                      }
                      className="formField-input"
                    />
                  </div>

                  <div className="col">
                    <label className="formField-label" htmlFor="invoiceNo">
                      Invoice No
                    </label>
                    <Field
                      type="text"
                      className="formField-input"
                      id="invoiceNo"
                      name="invoiceNo"
                      placeholder="Enter Invoice No"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="supplier" className="formField-label">
                      Supplier:
                    </label>
                    <Select
                      id="supplier"
                      options={supplierOption}
                      value={values?.supplier}
                      inputValue={values.supplierInputValue}
                      onInputChange={(newValue) =>
                        setFieldValue("supplierInputValue", newValue)
                      }
                      onChange={(option) => setFieldValue("supplier", option)}
                      onKeyDown={(e) => supplierNavigate(e, values)}
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
                    data={currentProductData}
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
                      {summaryData?.map((item, index) => (
                        <div key={index}>
                          <AmountDisplay
                            amount={item?.amount}
                            value={item?.value}
                            type={item?.type}
                          />
                        </div>
                      ))}
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
                </div>
              </div>

              <div className="my-5">
                <CommonButton
                  isSubmitting={isSubmitting}
                  text="Create Purchase"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddPurchases;
