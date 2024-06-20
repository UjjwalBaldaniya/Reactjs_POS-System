// ReusableTable.js
import React from "react";
import "../css/dynamicTable.css";

const DynamicTable = ({ columns, data, actions }) => {
  return (
    <div className="table-responsive">
      {/* <table className="dynamic-table">
        <thead>
          <tr>
            <th className="dynamic-table-heading dynamic-th-common">
              Product Category
            </th>
            <th className="dynamic-table-heading dynamic-th-common">
              Product Count
            </th>
            <th className="dynamic-table-heading dynamic-th-common text-end">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="dynamic-table-data dynamic-th-common">
              <div className="dynamic-table-img">
                <img
                  src="https://infypos-demo.nyc3.digitaloceanspaces.com/product_category/1669/pizza.jpg"
                  alt=""
                />
                <span>1</span>
              </div>
            </td>
            <td className="dynamic-table-data dynamic-th-common">101</td>
            <td className="dynamic-table-data dynamic-th-common">
              <div className="dynamic-table-data-action">
                <div className="dynamic-table-actions">
                  <button className="dynamic-table-edit-btn table-data-action-common">
                    <div>{editIcon}</div>
                  </button>
                </div>
                <div className="dynamic-table-actions">
                  <button className="dynamic-table-delete-btn table-data-action-common">
                    <div>{deleteIcon}</div>
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table> */}
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns?.map((col, index) => (
              <th
                key={index}
                className={`dynamic-table-heading dynamic-th-common`}
              >
                {col?.label}
              </th>
            ))}
            <th className="dynamic-table-heading dynamic-th-common text-end">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {columns?.map((col, colIndex) => {
                  const bgColor = col.getBgColor
                    ? col.getBgColor(row[col.accessor])
                    : col.bgColor;
                  const bgColorClass = bgColor ? `dynamic-bg-${bgColor}` : "";

                  let cellValue;
                  if (typeof col.accessor === "function") {
                    cellValue = col.accessor(row);
                  } else {
                    cellValue = row[col.accessor];
                  }

                  return (
                    <td
                      key={colIndex}
                      className="dynamic-table-data dynamic-th-common"
                    >
                      {col?.accessor === "category" && row?.image ? (
                        <div className="dynamic-table-img">
                          <img src={row?.image} alt="" />
                          <span>{row?.category}</span>
                        </div>
                      ) : (
                        <div className={bgColorClass}>{cellValue}</div>
                      )}
                    </td>
                  );
                })}
                <td className="dynamic-table-data dynamic-th-common">
                  <div className="dynamic-table-data-action">
                    {actions?.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className={`dynamic-table-${action.name}-btn table-data-action-common`}
                        onClick={() => action?.handler(row)}
                      >
                        {action?.icon}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
