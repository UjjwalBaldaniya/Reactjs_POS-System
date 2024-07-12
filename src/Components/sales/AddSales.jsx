import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import React from "react";
import Select from "react-select";
import CommonButton from "../../common/CommonButton";
import DynamicCalculateTable from "../../common/DynamicCalculateTable";
import InputWithSelect from "../../common/InputWithSelect";
import Navbar from "../../common/Navbar";
import AddSalesContainer from "../../container/sales/addSales.container";
import {
  purchaseTableColumns,
  PurchaseTableInputs,
  statusOptions,
} from "../../description/purchases.description";
import { addSalesColumns } from "../../description/sales/sales.description";
import { YYYY_MM_DD } from "../../utils/constants";
import { formattedDate } from "../../utils/functions/dateUtils";
import {
  calculateTotals,
  preventNegative,
} from "../../utils/functions/salesAndPurchasesUtils";

const AddSales = () => {
  const {
    initialValues,
    customerOption,
    actionsBtn,
    currentProductData,
    productTableData,
    getGrandTotal,
    handleBack,
    setCountQty,
    supplierNavigate,
    handleSubmit,
    handleInputChange,
    handleChange,
  } = AddSalesContainer();

  return (
    <div>
      <Navbar
        title="Add Sales"
        showBackBtn={true}
        handleBackBtn={() => handleBack()}
      />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => {
          console.log("🚀 ~ AddSales ~ values:", values);
          const { grandTotal, taxAmount, discountAmount, shippingAmount } =
            calculateTotals(
              currentProductData,
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
                        values.date
                          ? dayjs(formattedDate(values.date), YYYY_MM_DD)
                          : null
                      }
                      format={YYYY_MM_DD}
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
                    <label htmlFor="customer" className="formField-label">
                      Customer:
                    </label>
                    <Select
                      id="customer"
                      options={customerOption}
                      value={values?.customer}
                      inputValue={values.customerInputValue}
                      onInputChange={(newValue) =>
                        setFieldValue("customerInputValue", newValue)
                      }
                      onChange={(option) => setFieldValue("customer", option)}
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
                          )
                            handleInputChange(newValue, setFieldValue);
                        }}
                        onChange={(option) =>
                          handleChange(option, setFieldValue)
                        }
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
                    columns={addSalesColumns}
                    data={currentProductData}
                    setData={setCountQty}
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
                          <p>
                            {`$ ${item?.amount}`}{" "}
                            {item?.value === "%" && `(${item?.type || 0}% )`}
                          </p>
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
                <CommonButton isSubmitting={isSubmitting} text="Create Sales" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddSales;
