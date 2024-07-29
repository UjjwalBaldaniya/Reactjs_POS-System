import "../../css/addNewTable.css";

import { t } from "i18next";
import Select from "react-select";

import { plusIcon } from "../../assets/icons/tables";
import OffcanvasDrawer from "../../common/OffcanvasDrawer";

const AddNewTable = ({ isDrawerOpen, setDrawerOpen }) => {
  const options = [{ value: "doha", label: "doha" }];

  return (
    <OffcanvasDrawer
      isDrawerOpen={isDrawerOpen}
      setDrawerOpen={setDrawerOpen}
      title={t("table.addNewTable")}
    >
      <div className="label-input">
        <label className="add-table-label">{t("table.branch")}</label>
        <div className="input-div">
          <div className="input-div-inner">
            <Select
              options={options}
              // value={selectedOption2}
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
    </OffcanvasDrawer>
  );
};

export default AddNewTable;
