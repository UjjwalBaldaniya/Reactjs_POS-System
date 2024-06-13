import React from "react";
import { Offcanvas } from "react-bootstrap";
import CanvasHeader from "../../common/CanvasHeader";
import { Form, Formik } from "formik";
import FormField from "../../common/FormField";
import { plusIcon } from "../../assets/icons/tables";
import { variationFields } from "../../description/variations.description";

const AddVariations = ({ isDrawerOpen, setDrawerOpen }) => {
  return (
    <Offcanvas
      show={isDrawerOpen}
      onHide={setDrawerOpen}
      placement={"end"}
      className="offcanvas-addNewTable"
    >
      <Offcanvas.Header>
        <Offcanvas.Title className="w-100">
          <CanvasHeader setDrawerOpen={setDrawerOpen} title="Add Variations" />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>
          <Formik
            initialValues={{ variationName: "", variationType: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.variationName) errors.variationName = `Required`;
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {variationFields?.map((field, index) => (
                  <FormField
                    key={index}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                ))}
                <div className="add-table-create-btn mt-4">
                  <button disabled={isSubmitting}>
                    {plusIcon("white")}
                    <span className="ms-2">Save</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddVariations;
