import { Form, Formik } from "formik";

import CommonButton from "../../common/CommonButton";
import FormField from "../../common/FormField";
import Loader from "../../common/Loader";
import Navbar from "../../common/Navbar";
import CreateSupplierContainer from "../../container/supplier/createSupplier.container";
import { supplierFormField } from "../../description/suppliers.description";
import { supplierSchema } from "../../utils/validationSchema/peoplesSchema";

const CreateSupplier = () => {
  const { handleBack, initialValues, handleSubmit, isEdit, status } =
    CreateSupplierContainer();

  if (status !== "succeeded" && isEdit) return <Loader />;

  return (
    <div>
      <Navbar
        title="Create Supplier"
        showBackBtn
        handleBackBtn={() => handleBack()}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={supplierSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, values, isSubmitting }) => (
          <Form>
            <div className="row">
              {supplierFormField?.map((field, index) => (
                <FormField
                  key={index}
                  field={field}
                  values={values}
                  errors={errors}
                  touched={touched}
                />
              ))}
            </div>
            <div className="my-5">
              <CommonButton
                isSubmitting={isSubmitting}
                text="Create Supplier"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateSupplier;
