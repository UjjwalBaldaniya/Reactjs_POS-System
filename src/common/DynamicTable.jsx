import React from "react";
import "../css/dynamicTable.css";

const DynamicTable = ({ columns, data, actions }) => {
  if (!data || data?.length === 0) {
    return <div>No data available</div>;
  }

  const getCellValue = (row, accessor) =>
    typeof accessor === "function" ? accessor(row) : row?.[accessor];

  return (
    <div className="table-responsive">
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns?.map((col, index) => (
              <th
                key={index}
                className="dynamic-table-heading dynamic-th-common"
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
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns?.map((col, colIndex) => {
                const bgColor = col?.getBgColor
                  ? `dynamic-bg-${col?.getBgColor(
                      getCellValue(row, col?.accessor)
                    )}`
                  : col?.bgColor
                  ? `dynamic-bg-${col?.bgColor}`
                  : "";

                return (
                  <td
                    key={colIndex}
                    className="dynamic-table-data dynamic-th-common"
                  >
                    {col?.render ? (
                      col?.render(row)
                    ) : (
                      <div className={bgColor}>
                        {getCellValue(row, col?.accessor)}
                      </div>
                    )}
                  </td>
                );
              })}
              <td className="dynamic-table-data dynamic-th-common">
                <div className="dynamic-table-data-action">
                  {actions?.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`dynamic-table-${action?.name}-btn table-data-action-common`}
                      onClick={() => action?.handler(row)}
                    >
                      {action?.icon}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
