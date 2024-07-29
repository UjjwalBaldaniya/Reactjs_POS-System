import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Modal, Spinner } from "react-bootstrap";

import AddCategoryContainer from "../../container/category/addCategory.container";
import { categorySchema } from "../../utils/validationSchema/productsSchema";

const AddProductsCategories = ({ isModalOpen }) => {
  const { isEdit, initialValues, handleSubmit, onModalClose } =
    AddCategoryContainer();

  return (
    <Modal show={isModalOpen} onHide={onModalClose} size="md">
      <Modal.Header closeButton style={{ padding: "1rem 2rem " }}>
        <Modal.Title>{isEdit ? "Edit" : "Add"} Units</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1rem 2rem " }}>
        <div>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={categorySchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form>
                <div>
                  <label className="formField-label" htmlFor="productCategory">
                    Product Category
                  </label>
                  <Field
                    type="text"
                    className={`formField-input ${
                      touched.productCategory && errors.productCategory
                        ? "form-control-invalid"
                        : ""
                    }`}
                    id="productCategory"
                    name="productCategory"
                    placeholder="Enter Product Category"
                  />
                  <ErrorMessage
                    name="productCategory"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mt-4">
                  <label className="formField-label" htmlFor="productImage">
                    Product Image
                  </label>
                  <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    onChange={(event) => {
                      setFieldValue(
                        "productImage",
                        event.currentTarget.files[0]
                      );
                    }}
                    className={`form-control ${
                      touched.productImage && errors.productImage
                        ? "form-control-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="productImage"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {values.productImage && (
                  <div className="mt-4">
                    <img
                      src={
                        typeof values.productImage === "string"
                          ? `${process.env.REACT_APP_IMG_URL}${values.productImage}`
                          : URL.createObjectURL(values.productImage)
                      }
                      alt="Product Preview"
                      style={{ maxWidth: "430px", marginTop: "10px" }}
                    />
                  </div>
                )}

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

export default AddProductsCategories;
