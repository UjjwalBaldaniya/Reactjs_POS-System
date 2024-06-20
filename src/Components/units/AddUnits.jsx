import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import FormField from "../../common/FormField";
import { unitsFields } from "../../description/units.description";
import { unitSchema } from "../../utils/validationSchema/unitSchema";
import { useSelector } from "react-redux";

const AddUnits = ({ isDrawerOpen, setDrawerOpen }) => {
  const { baseUnitsData } = useSelector((state) => state?.baseUnit);
  console.log("🚀 ~ AddUnits ~ baseUnitDataById:", baseUnitsData);

  return (
    <Modal show={isDrawerOpen} onHide={setDrawerOpen} size="md">
      <Modal.Header closeButton style={{ padding: "1rem 2rem " }}>
        <Modal.Title>Add Units</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1rem 2rem " }}>
        <div>
          <Formik
            initialValues={{ name: "", shortName: "", baseUnit: "" }}
            enableReinitialize={true}
            validationSchema={unitSchema}
            onSubmit={async (
              values,
              { setSubmitting, setFieldError, resetForm }
            ) => {
              setSubmitting(true);
              const newValue = {
                base_unit_name: values.name,
              };
              // try {
              //   const response = isEdit
              //     ? await editBaseUnit(baseUnitDataById?._id, newValue)
              //     : await addBaseUnit(newValue);

              //   if (response) {
              //     resetForm();
              //     setDrawerOpen(false);
              //     dispatch(fetchBaseUnits());
              //   }
              // } catch (error) {
              //   setFieldError(
              //     "general",
              //     error.response?.data?.msg || "An error occurred"
              //   );
              // }
              setSubmitting(false);
            }}
          >
            {({ errors, values, isSubmitting, setFieldValue }) => {
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
                      />
                    );
                  })}

                  <Modal.Footer className="mt-3">
                    <Button variant="secondary" onClick={setDrawerOpen}>
                      Close
                    </Button>
                    <Button
                      className="save-btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save
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
