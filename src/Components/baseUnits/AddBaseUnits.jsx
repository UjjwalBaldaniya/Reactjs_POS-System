import { Form, Formik } from "formik";
import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { addBaseUnit, editBaseUnit } from "../../api/services/baseUnitsService";
import FormField from "../../common/FormField";
import { baseUnitsFields } from "../../description/baseUnits.description";
import { baseUnitSchema } from "../../utils/validationSchema/productsSchema";
import { useDispatch, useSelector } from "react-redux";
import { fetchBaseUnits } from "../../redux/slice/baseUnitSlice";

const AddBaseUnits = ({ isDrawerOpen, setDrawerOpen }) => {
  const dispatch = useDispatch();
  const { baseUnitDataById, isEdit } = useSelector((state) => state?.baseUnit);

  return (
    <Modal show={isDrawerOpen} onHide={setDrawerOpen} size="md">
      <Modal.Header closeButton style={{ padding: "1rem 2rem" }}>
        <Modal.Title>{isEdit ? "Edit" : "Add"} Base Units</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1rem 2rem" }}>
        <div>
          <Formik
            initialValues={{ name: baseUnitDataById?.base_unit_name || "" }}
            enableReinitialize={true}
            validationSchema={baseUnitSchema}
            onSubmit={async (
              values,
              { setSubmitting, setFieldError, resetForm }
            ) => {
              setSubmitting(true);
              const newValue = {
                base_unit_name: values.name,
              };
              try {
                const response = isEdit
                  ? await editBaseUnit(baseUnitDataById?._id, newValue)
                  : await addBaseUnit(newValue);

                if (response) {
                  resetForm();
                  setDrawerOpen(false);
                  dispatch(fetchBaseUnits());
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

export default AddBaseUnits;
