import React from "react";
import { canvasCloseIcon, roundPlusIcon } from "../assets/icons/tables";
import "../css/canvasHeader.css";

const CanvasHeader = ({ setDrawerOpen, title }) => {
  return (
    <div className="canvas-header">
      <span className="canvas-header-plus-icon">{roundPlusIcon}</span>
      <h2 className="canvas-header-title">{title}</h2>
      <button
        className="canvas-header-close-btn box-25"
        onClick={setDrawerOpen}
      >
        {canvasCloseIcon}
      </button>
    </div>
  );
};

export default CanvasHeader;
