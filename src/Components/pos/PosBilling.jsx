import { Button } from "react-bootstrap";
import Select from "react-select";

import DynamicCalculateTable from "../../common/DynamicCalculateTable";
import InputWithSelect from "../../common/InputWithSelect";
import { posColumns } from "../../description/pos.description";
import {
  purchaseTableColumns,
  purchaseTableInputs,
} from "../../description/purchases.description";
import { preventNegative } from "../../utils/functions/salesAndPurchasesUtils";

const PosBilling = ({
  customerOption,
  values,
  setFieldValue,
  navigateToCustomer,
  productTableData,
  setCountQty,
  actionsBtn,
  summaryData,
}) => {
  return (
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
            onChange={(option) => setFieldValue("customer", option)}
            onKeyDown={(e) => navigateToCustomer(e, values, customerOption)}
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
          <div className="purchase-table mt-4">
            <div className="purchase-table-key col">
              {purchaseTableColumns?.map((data, index) => (
                <div key={index}>
                  <p className="text-nowrap fs-7">{data}</p>
                </div>
              ))}
            </div>
            <div className="purchase-table-key col">
              {purchaseTableInputs?.map((input, index) => (
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
                    <p className="fs-7">
                      {`$ ${item?.amount}`}{" "}
                      {item?.type === "%" && `( ${item?.value || 0}% )`}
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
  );
};

export default PosBilling;
