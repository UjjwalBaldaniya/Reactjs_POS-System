import { Form, Formik } from "formik";
import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import FormField from "../../common/FormField";
import AddUnitsContainer from "../../container/units/addUnits.container";
import { unitSchema } from "../../utils/validationSchema/productsSchema";

const AddUnits = ({ isModalOpen }) => {
  const { isEdit, initialValues, handleSubmit, unitsFields, onModalClose } =
    AddUnitsContainer();

  return (
    <Modal show={isModalOpen} onHide={onModalClose} size="md">
      <Modal.Header closeButton style={{ padding: "1rem 2rem " }}>
        <Modal.Title>{isEdit ? "Edit" : "Add"} Units</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1rem 2rem " }}>
        <div>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={unitSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, isSubmitting, setFieldValue }) => {
              return (
                <Form>
                  {unitsFields?.map((field, index) => {
                    return (
                      <FormField
                        key={index}
                        field={field}
                        setFieldValue={setFieldValue}
                        values={values}
                        errors={errors}
                        touched={touched}
                      />
                    );
                  })}

                  <Modal.Footer className="mt-3">
                    <Button variant="secondary" onClick={onModalClose}>
                      Close
                    </Button>
                    <Button
                      className="save-btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </Modal.Footer>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddUnits;
