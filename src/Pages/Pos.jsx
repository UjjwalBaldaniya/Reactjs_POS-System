import { Form, Formik } from "formik";
import React from "react";
import Loader from "../common/Loader";
import PosBilling from "../components/pos/PosBilling";
import PosPurchaseItem from "../components/pos/PosPurchaseItem";
import PosContainer from "../container/pos/pos.container";
import "../css/pos.css";
import { calculateTotals } from "../utils/functions/salesAndPurchasesUtils";

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
    <div className="container-fluid">
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
                    <PosBilling
                      values={values}
                      actionsBtn={actionsBtn}
                      summaryData={summaryData}
                      customerOption={customerOption}
                      productTableData={productTableData}
                      setCountQty={setCountQty}
                      setFieldValue={setFieldValue}
                      navigateToCustomer={navigateToCustomer}
                    />
                  </div>
                  <div className="col-8">
                    <PosPurchaseItem
                      categoryNames={categoryNames}
                      categoryTabData={categoryTabData}
                      productTableData={productTableData}
                      filteredProductList={filteredProductList}
                      handleTabClick={handleTabClick}
                      handleSearchChange={handleSearchChange}
                      handleProductCardClick={handleProductCardClick}
                      handleSearchInputChange={handleSearchInputChange}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Pos;
