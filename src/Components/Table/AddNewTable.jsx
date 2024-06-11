import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import "../../css/addNewTable.css";
import {
  canvasCloseIcon,
  plusIcon,
  roundPlusIcon,
} from "../../assets/icons/tables";
import Select from "react-select";
import { t } from "i18next";

const AddNewTable = ({ showTable, setShowTable }) => {
  const options = [{ value: "doha", label: "doha" }];
  const [selectedOption2, setSelectedOption2] = useState(options[0]);

  return (
    <Offcanvas
      show={showTable}
      onHide={setShowTable}
      placement={"end"}
      className="offcanvas-addNewTable"
    >
      <Offcanvas.Header>
        <Offcanvas.Title className="w-100">
          <div className="d-flex justify-content-between align-items-center w-100">
            <span className="add-table-title-icon">{roundPlusIcon}</span>
            <h2 className="add-table-title">{t("table.addNewTable")}</h2>
            <div className="d-flex align-items-center ">
              <button className="add-table-button" onClick={setShowTable}>
                {canvasCloseIcon}
              </button>
            </div>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="label-input">
          <label className="add-table-label">{t("table.branch")}</label>
          <div className="input-div">
            <div className="input-div-inner">
              <Select
                options={options}
                // value={selectedOption2}
                onChange={setSelectedOption2}
                placeholder={t("table.selectBranch")}
              />
            </div>
          </div>
        </div>
        <div className="label-input mt-3">
          <label className="add-table-label">{t("table.tableCode")}</label>
          <div className="input-div">
            <div className="input-div-inner">
              <input
                type="text"
                className="login-input"
                id="username"
                name="username"
                placeholder={t("table.enterTableCode")}
              />
            </div>
          </div>
        </div>
        <div className="add-table-add-btn mt-4">
          <button>
            {plusIcon("black")}
            <span className="ms-2">{t("table.addCode")}</span>
          </button>
        </div>
        <div className="add-table-create-btn mt-4">
          <button>
            {plusIcon("white")}
            <span className="ms-2">{t("table.createTable")}</span>
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddNewTable;
