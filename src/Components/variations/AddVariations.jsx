import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import AddVariationsContainer from "../../container/variations/addVariations.container";
import { variationSchema } from "../../utils/validationSchema/productsSchema";

const AddVariations = ({ isModalOpen }) => {
  const { isEdit, initialValues, handleSubmit, onModalClose } =
    AddVariationsContainer();

  return (
    <Modal show={isModalOpen} onHide={onModalClose} size="md">
      <Modal.Header closeButton style={{ padding: "1rem 2rem" }}>
        <Modal.Title>{isEdit ? "Edit" : "Add"} Variation</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1rem 2rem" }}>
        <div>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={variationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, touched, errors, isSubmitting }) => (
              <Form>
                <div>
                  <label className="formField-label">Name</label>
                  <Field
                    type="text"
                    className={`formField-input ${
                      touched?.name && errors?.name
                        ? "form-control-invalid"
                        : ""
                    }`}
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mt-3">
                  <label className="formField-label">Variation Types</label>
                  <FieldArray name="variationTypes">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.variationTypes?.length > 0 &&
                          values.variationTypes?.map((variationType, index) => (
                            <div className="row mt-3">
                              <div key={index} className="col-10">
                                <Field
                                  name={`variationTypes.${index}`}
                                  placeholder="Enter Variation Type"
                                  type="text"
                                  className={`formField-input ${
                                    touched.variationTypes?.[index] &&
                                    errors.variationTypes?.[index]
                                      ? "form-control-invalid"
                                      : ""
                                  }`}
                                />
                                <ErrorMessage
                                  name={`variationTypes.${index}`}
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="col-2">
                                <button
                                  type="button"
                                  className="btn btn-primary "
                                  onClick={() => push("")}
                                  style={{
                                    display:
                                      index === 0 ? "inline-block" : "none",
                                  }}
                                >
                                  +
                                </button>
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => remove(index)}
                                  >
                                    -
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </FieldArray>
                </div>

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

export default AddVariations;
