import React from "react";
import { toast } from "react-toastify";
import "../css/dynamicTable.css";

const DynamicCalculateTable = ({ columns, data, setData, actions }) => {
  const getCellValue = (row, accessor) =>
    typeof accessor === "function" ? accessor(row) : row?.[accessor];

  const handleQtyChange = (row, newQty) => {
    if (newQty < 1 || newQty > row?.stock) {
      toast.info(`Stock must be between 1 and ${row?.stock}.`);
      return;
    }

    const updatedData = data?.map((item) =>
      item === row
        ? {
            ...item,
            qty: newQty,
            subtotal: newQty * item?.product_price,
          }
        : item
    );

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
              <td colSpan={columns?.length + 1} className="text-center">
                No data available
              </td>
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
                        type="button"
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
