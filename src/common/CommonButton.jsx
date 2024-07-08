import React from "react";
import { Spinner } from "react-bootstrap";

const CommonButton = ({ text, isSubmitting, ...props }) => {
  return (
    <button
      className="create-save-btn"
      type="submit"
      disabled={isSubmitting}
      {...props}
    >
      {isSubmitting ? <Spinner animation="border" size="md" /> : text}
    </button>
  );
};

export default CommonButton;
