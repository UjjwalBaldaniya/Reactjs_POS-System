import { Form, Formik } from "formik";
import { Button, Modal, Spinner } from "react-bootstrap";

import FormField from "../../common/FormField";
import AddBaseUnitsContainer from "../../container/baseUnits/addBaseUnits.container";
import { baseUnitsFields } from "../../description/baseUnits.description";
import { baseUnitSchema } from "../../utils/validationSchema/productsSchema";

const AddBaseUnits = ({ isModalOpen }) => {
  const { isEdit, initialValues, onModalClose, handleSubmit } =
    AddBaseUnitsContainer();

  return (
    <Modal show={isModalOpen} onHide={onModalClose} size="md">
      <Modal.Header closeButton style={{ padding: "1rem 2rem" }}>
        <Modal.Title>{isEdit ? "Edit" : "Add"} Base Units</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1rem 2rem" }}>
        <div>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={baseUnitSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, isSubmitting }) => (
              <Form>
                {baseUnitsFields?.map((field, index) => (
                  <FormField
                    key={index}
                    field={field}
                    values={values}
                    errors={errors}
                    touched={touched}
                  />
                ))}
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
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddBaseUnits;
