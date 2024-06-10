import React, { useState } from "react";
import Navbar from "../common/Navbar";
import "../css/table.css";
import {
  deleteIcon,
  editIcon,
  exportIcon,
  iIcon,
  searchIcon,
} from "../assets/icons/tables";
import { wrightIcon } from "../assets/icons/dashboard";
import AddNewTable from "../Components/Table/AddNewTable";

const Table = ({ language, setLanguage }) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="table-section">
      <Navbar
        language={language}
        setLanguage={setLanguage}
        title={"Table"}
        showExportBtn={true}
        showNewAddBtn={true}
        newAddBtnText="New Table"
        openCanvas={() => setShowTable(true)}
      />

      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-tr">
              <th className="table-heading th-common">
                <div className="d-flex align-items-center justify-content-start">
                  <input type="checkbox" className="table-heading-checkbox" />
                </div>
              </th>
              <th className="table-heading th-common">No</th>
              <th className="table-heading th-common">Table Code</th>
              <th className="table-heading th-common">Branch</th>
              <th className="table-heading th-common">Status</th>
              <th className="table-heading th-common">
                <div className="table-heading-export">
                  <div className="d-inline-block">
                    <button className="table-heading-export-btn">
                      {exportIcon("22")}
                      <span className="table-heading-export-text">
                        Export selected
                      </span>
                    </button>
                  </div>
                  <div className="d-inline-block ms-2">
                    <div className="table-heading-search">
                      <input
                        placeholder="Enter keyword"
                        type="text"
                        className="table-heading-search-input"
                      />
                      <div className="table-heading-search-icon">
                        {searchIcon}
                      </div>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-data th-common">
                <div className="d-flex align-items-center justify-content-start">
                  <input type="checkbox" className="table-heading-checkbox" />
                </div>
              </td>
              <td className="table-data th-common">
                <div>1</div>
              </td>
              <td className="table-data th-common">101</td>
              <td className="table-data th-common">doha</td>
              <td className="table-data th-common">
                <div className="table-data-status">
                  {wrightIcon(24)}
                  <span className="ms-2">Available</span>
                </div>
              </td>
              <td className="table-data th-common">
                <div className="table-data-action">
                  <div className="table-data-scan-edit-delete">
                    <button className="table-data-scan-btn table-data-action-common">
                      <div className="table-data-icon-common">{iIcon}</div>
                    </button>
                  </div>
                  <div className="table-data-scan-edit-delete">
                    <button className="table-data-edit-btn table-data-action-common">
                      <div className="table-data-icon-common">{editIcon}</div>
                    </button>
                  </div>
                  <div className="table-data-scan-edit-delete">
                    <button className="table-data-delete-btn table-data-action-common">
                      <div className="table-data-icon-common">{deleteIcon}</div>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <AddNewTable
        showTable={showTable}
        setShowTable={() => setShowTable(false)}
      />
    </div>
  );
};

export default Table;
