import React from "react";
import "../css/dynamicTable.css";

const DynamicCalculateTable = ({ columns, data, setData, actions }) => {
  const getCellValue = (row, accessor) =>
    typeof accessor === "function" ? accessor(row) : row?.[accessor];

  const handleQtyChange = (row, newQty) => {
    if (newQty < 1) return;

    const updatedData = data?.map((item) => {
      if (item === row) {
        const updatedItem = {
          ...item,
          qty: newQty,
          subtotal: newQty * item?.single_details?.product_price,
        };
        return updatedItem;
      }
      return item;
    });

    setData(updatedData);
  };

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
          {!data || data?.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>No data available</td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
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
                        col?.render(row, handleQtyChange)
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicCalculateTable;
