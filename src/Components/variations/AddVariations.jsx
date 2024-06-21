import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addVariation,
  editVariation,
} from "../../api/services/variationsService";
import { fetchVariations } from "../../redux/slice/variationSlice";
import { variationSchema } from "../../utils/validationSchema/productsSchema";

const AddVariations = ({ isDrawerOpen, setDrawerOpen }) => {
  const dispatch = useDispatch();
  const { variationDataById, isEdit } = useSelector(
    (state) => state?.variation
  );
  console.log("🚀 ~ AddVariations ~ fetchVariationById:", variationDataById);

  return (
    <Modal show={isDrawerOpen} onHide={setDrawerOpen} size="md">
      <Modal.Header closeButton style={{ padding: "1rem 2rem" }}>
        <Modal.Title>{isEdit ? "Edit" : "Add"} Variation</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1rem 2rem" }}>
        <div>
          <Formik
            initialValues={{
              name: variationDataById?.variations_name || "",
              variationTypes: variationDataById?.variations_types?.map(
                (value) => value?.name
              ) || [""],
            }}
            enableReinitialize
            validationSchema={variationSchema}
            onSubmit={async (
              values,
              { setSubmitting, setFieldError, resetForm }
            ) => {
              console.log("🚀 ~ AddVariations ~ values:", values);
              setSubmitting(true);
              const newValue = {
                variations_name: values.name,
                variations_types: values.variationTypes?.map((value) => ({
                  name: value,
                })),
              };
              console.log("🚀 ~ AddVariations ~ newValue:", newValue);

              try {
                const response = isEdit
                  ? await editVariation(variationDataById?._id, newValue)
                  : await addVariation(newValue);

                if (response) {
                  resetForm();
                  setDrawerOpen(false);
                  dispatch(fetchVariations());
                }
              } catch (error) {
                setFieldError(
                  "general",
                  error.response?.data?.msg || "An error occurred"
                );
              }
              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <div>
                  <label className="formField-label">Name</label>
                  <Field
                    type="text"
                    className="formField-input"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
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
                                  className="formField-input"
                                />
                                <ErrorMessage
                                  name={`variationTypes.${index}`}
                                  component="div"
                                  className="error"
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
                  <Button variant="secondary" onClick={setDrawerOpen}>
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
