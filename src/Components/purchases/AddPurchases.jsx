import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import { deleteIcon, editIcon, plusIcon } from "../../assets/icons/tables";
import Navbar from "../../common/Navbar";
import DynamicTable from "../../common/DynamicTable";

const AddPurchases = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/purchases");
  };

  const options = [
    { value: "all", label: "For all branch" },
    { value: "doha", label: "doha" },
  ];

  const fields = [
    {
      name: "date",
      type: "date",
      label: "Date",
      className: "col",
      rowClass: true,
    },
    {
      name: "warehouse",
      type: "select",
      label: "Warehouse",
      options,
      className: "col",
      rowClass: false,
    },
    {
      name: "supplier",
      type: "select",
      label: "Supplier",
      options,
      className: "col",
      rowClass: false,
    },
    {
      name: "product",
      type: "text",
      label: "Product",
      placeholder: "Search product by code name",
      className: "mt-3",
      rowClass: true,
    },
    {
      name: "orderTax",
      type: "text",
      label: "Order Tax",
      placeholder: "0.00",
      className: "col",
    },
    {
      name: "discount",
      type: "text",
      label: "Discount",
      placeholder: "0.00",
      className: "col",
    },
    {
      name: "shipping",
      type: "text",
      label: "Shipping",
      placeholder: "0.00",
      className: "col",
    },
    {
      name: "note",
      type: "textarea",
      label: "Note",
      placeholder: "Enter notes",
      className: "mt-3",
    },
  ];

  const baseUnitsColumns = [
    { label: "Product", accessor: "product" },
    { label: "Net Unit Cost", accessor: "netUnitCost" },
    { label: "Stock", accessor: "stock" },
    { label: "QTY", accessor: "qty" },
    { label: "Discount", accessor: "discount" },
    { label: "Tax", accessor: "tax" },
    { label: "Subtotal", accessor: "subtotal" },
  ];

  const baseUnitsData = [
    {
      product: "Cake",
      netUnitCost: "100$",
      stock: "10",
      qty: "1",
      discount: "10%",
      tax: "5%",
      subtotal: "150$",
    },
  ];

  const handleEdit = (row) => {};

  const handleDelete = (row) => {};

  const actionsBtn = [
    { name: "edit", icon: editIcon, handler: handleEdit },
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  const validationSchema = Yup.object().shape({
    product: Yup.string().required("Required"),
    note: Yup.string().required("Required"),
  });

  return (
    <div>
      <Navbar
        title="Add Purchases"
        showBackBtn={true}
        handleBackBtn={() => handleBack()}
      />

      <Formik
        initialValues={{
          date: "",
          warehouse: options?.[1],
          supplier: "",
          product: "",
          orderTax: "",
          discount: "",
          shipping: "",
          note: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div>
              <div className="row">
                <div className="col">
                  <label htmlFor="date" className="formField-label">
                    Date:
                  </label>
                  <Field
                    type="date"
                    name="date"
                    className="formField-input"
                    value={values.date}
                  />
                </div>
                <div className="col">
                  <label htmlFor="warehouse" className="formField-label">
                    Warehouse:
                  </label>
                  <Select
                    id="warehouse"
                    options={options}
                    value={values.warehouse}
                    onChange={(option) => setFieldValue("warehouse", option)}
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
                <Field
                  type="text"
                  name="product"
                  className="formField-input"
                  placeholder="Search product by code name"
                />
                <ErrorMessage
                  name="product"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mt-4">
                <label className="formField-label">Order Items:</label>
                <DynamicTable
                  columns={baseUnitsColumns}
                  data={baseUnitsData}
                  actions={actionsBtn}
                />
              </div>

              <div className="row mt-3">
                <div className="col">
                  <label className="formField-label">Order Tax:</label>
                  <div className="input-percentage">
                    <Field
                      type="text"
                      name="orderTax"
                      className="formField-input-percentage"
                      placeholder="0.00"
                    />
                    <span className="input-symbol-percentage">%</span>
                  </div>
                </div>
                <div className="col">
                  <label className="formField-label">Discount:</label>
                  <div className="input-percentage">
                    <Field
                      type="text"
                      name="discount"
                      className="formField-input-percentage"
                      placeholder="0.00"
                    />
                    <span className="input-symbol-percentage">$</span>
                  </div>
                </div>
                <div className="col">
                  <label className="formField-label">Shipping:</label>
                  <div className="input-percentage">
                    <Field
                      type="text"
                      name="shipping"
                      className="formField-input-percentage"
                      placeholder="0.00"
                    />
                    <span className="input-symbol-percentage">$</span>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-4">
                  <label htmlFor="warehouse" className="formField-label">
                    Warehouse:
                  </label>
                  <Select
                    id="warehouse"
                    options={options}
                    value={values.warehouse}
                    onChange={(option) => setFieldValue("warehouse", option)}
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

            <div className="add-table-create-btn mt-4">
              <button type="submit" disabled={isSubmitting}>
                {plusIcon("white")}
                <span className="ms-2">Save</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPurchases;
