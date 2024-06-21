import { useDispatch, useSelector } from "react-redux";
import { addCategory, editCategory } from "../../api/services/categoryService";
import { fetchCategory } from "../../redux/slice/categorySlice";

const AddCategoryContainer = (setDrawerOpen) => {
  const dispatch = useDispatch();
  const { categoryDataById, isModalOpen } = useSelector(
    (state) => state?.category
  );

  const initialValues = {
    productCategory: categoryDataById?.category_name || "",
    productImage: categoryDataById?.category_image || null,
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    setSubmitting(true);
    const newValue = {
      category_name: values.productCategory,
      category_image: values.productImage,
    };

    const formData = new FormData();
    formData.append("category_name", values.productCategory);
    formData.append("category_image", values.productImage);

    try {
      const response = false
        ? await editCategory(categoryDataById?._id, newValue)
        : await addCategory(formData);

      if (response) {
        resetForm();
        setDrawerOpen(false);
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

  return { initialValues, handleSubmit };
};

export default AddCategoryContainer;
