import { useDispatch, useSelector } from "react-redux";
import { addCategory, editCategory } from "../../api/services/categoryService";
import { fetchCategory, setModalOpen } from "../../redux/slice/categorySlice";

const AddCategoryContainer = () => {
  const dispatch = useDispatch();
  const { categoryDataById, isEdit } = useSelector((state) => state?.category);

  const onModalClose = () => {
    dispatch(setModalOpen(false));
  };

  const initialValues = {
    productCategory: categoryDataById?.category_name || "",
    productImage: categoryDataById?.category_image || null,
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("category_name", values.productCategory);
    formData.append("category_image", values.productImage);

    try {
      const response = isEdit
        ? await editCategory(categoryDataById?._id, formData)
        : await addCategory(formData);

      if (response) {
        resetForm();
        dispatch(setModalOpen(false));
        dispatch(fetchCategory());
      }
    } catch (error) {
      setFieldError(
        "general",
        error.response?.data?.msg || "An error occurred"
      );
    }
    setSubmitting(false);
  };

  return { isEdit, initialValues, handleSubmit, onModalClose };
};

export default AddCategoryContainer;
