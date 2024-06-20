import { Form, Formik } from "formik";
import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUnit, editUnit } from "../../api/services/unitService";
import FormField from "../../common/FormField";
import { fetchUnits } from "../../redux/slice/unitSlice";
import { unitSchema } from "../../utils/validationSchema/productsSchema";

const AddUnits = ({ isDrawerOpen, setDrawerOpen }) => {
  const dispatch = useDispatch();

  const { baseUnitsData } = useSelector((state) => state?.baseUnit);
  const { isEdit, unitDataById } = useSelector((state) => state?.unit);

  const transformedBaseUnitsData = baseUnitsData?.map((unit) => ({
    value: unit._id,
    label: unit.base_unit_name,
  }));

  const unitsFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter name",
    },
    {
      label: "Short Name",
      name: "shortName",
      type: "text",
      placeholder: "Enter short name",
      mainClassName: "mt-3",
    },
    {
      label: "Base Unit",
      name: "baseUnit",
      type: "select",
      placeholder: "Select base unit",
      mainClassName: "mt-3",
      options: transformedBaseUnitsData,
    },
  ];

  return (
    <Modal show={isDrawerOpen} onHide={setDrawerOpen} size="md">
      <Modal.Header closeButton style={{ padding: "1rem 2rem " }}>
        <Modal.Title>{isEdit ? "Edit" : "Add"} Units</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1rem 2rem " }}>
        <div>
          <Formik
            initialValues={{
              name: unitDataById?.unit_name || "",
              shortName: unitDataById?.unit_short_name || "",
              baseUnit: unitDataById?.base_unit_id?._id || "",
            }}
            enableReinitialize={true}
            validationSchema={unitSchema}
            onSubmit={async (
              values,
              { setSubmitting, setFieldError, resetForm }
            ) => {
              setSubmitting(true);
              const newValue = {
                unit_name: values.name,
                unit_short_name: values.shortName,
                base_unit_id: values.baseUnit,
              };
              try {
                const response = isEdit
                  ? await editUnit(unitDataById?._id, newValue)
                  : await addUnit(newValue);

                if (response) {
                  resetForm();
                  setDrawerOpen(false);
                  dispatch(fetchUnits());
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
              );
            }}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddUnits;
