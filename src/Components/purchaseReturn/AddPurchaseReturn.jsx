import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import Select from "react-select";

import CommonButton from "../../common/CommonButton";
import DynamicCalculateTable from "../../common/DynamicCalculateTable";
import Loader from "../../common/Loader";
import Navbar from "../../common/Navbar";
import AddPurchaseReturnContainer from "../../container/purchase/addPurchaseReturn.container";
import { addPurchaseReturnColumns } from "../../description/purchaseReturn.description";
import { statusOptions } from "../../description/purchases.description";
import { YYYY_MM_DD } from "../../utils/constants";
import { formattedDate } from "../../utils/functions/dateUtils";

const AddPurchaseReturn = () => {
  const {
    actionsBtn,
    initialValues,
    billNoSupplierOption,
    currentProductData,
    loading,
    isEdit,
    handleBack,
    setProductTableData,
    handleChange,
    handleSubmit,
    calculateTotals,
    purchaseReturnItems,
    getGrandTotal,
    setCountQty,
  } = AddPurchaseReturnContainer();

  if (loading !== "succeeded" && isEdit) return <Loader />;

  return (
    <div>
      <Navbar
        title="Purchase Return"
        showBackBtn={true}
        handleBackBtn={() => handleBack()}
      />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => {
          const grandTotal = calculateTotals(currentProductData);
          getGrandTotal(grandTotal);
          const returnItemsOption = purchaseReturnItems(values);

          return (
            <Form>
              <div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="supplier" className="formField-label">
                      Supplier:
                    </label>
                    <Select
                      id="supplier"
                      options={billNoSupplierOption}
                      value={values?.supplier}
                      onChange={(option) => {
                        setFieldValue("supplier", option);
                        setProductTableData([]);
                      }}
                    />
                  </div>
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
                </div>

                <div className="mt-3">
                  <label className="formField-label">Product:</label>
                  <Select
                    id="products"
                    options={returnItemsOption}
                    onChange={(option) => handleChange(option, setFieldValue)}
                  />
                </div>

                <div className="mt-4">
                  <label className="formField-label">Order Items:</label>
                  <DynamicCalculateTable
                    columns={addPurchaseReturnColumns}
                    data={currentProductData}
                    setData={setCountQty}
                    actions={actionsBtn}
                  />
                </div>

                <div className="purchase-table-container">
                  <div className="purchase-table mt-4">
                    <div className="purchase-table-key col">
                      <div>
                        <p>Grand Total</p>
                      </div>
                    </div>
                    <div className="col purchase-table-key purchase-table-end">
                      <div>
                        <p>$ {grandTotal}</p>
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

export default AddPurchaseReturn;
