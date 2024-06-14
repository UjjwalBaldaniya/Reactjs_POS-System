import React, { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const CustomAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-accordion w-100 ">
      <div
        className="accordion-header d-flex align-items-center justify-content-between w-100"
        onClick={toggleAccordion}
      >
        <span className="accordion-header-title sidebar-menu-name ms-2 w-100">
          {title}
        </span>
        <span className="accordion-header-icon">
          {isOpen ? <FaAngleDown /> : <FaAngleRight />}
        </span>
      </div>
      {isOpen && <div className="accordion-body">{children}</div>}
    </div>
  );
};

export default CustomAccordion;
