import { useDispatch, useSelector } from "react-redux";

import {
  addVariation,
  editVariation,
} from "../../api/services/variationsService";
import {
  fetchVariations,
  setModalOpen,
} from "../../redux/slice/variationSlice";

const AddVariationsContainer = () => {
  const dispatch = useDispatch();
  const { variationDataById = {}, isEdit } = useSelector(
    (state) => state?.variation || {}
  );

  const onModalClose = () => {
    dispatch(setModalOpen(false));
  };

  const initialValues = {
    name: variationDataById?.variations_name || "",
    variationTypes: variationDataById?.variations_types?.map(
      (value) => value?.name
    ) || [""],
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    setSubmitting(true);
    const newValue = {
      variations_name: values.name,
      variations_types: values.variationTypes?.map((value) => ({
        name: value,
      })),
    };

    try {
      const response = isEdit
        ? await editVariation(variationDataById?._id, newValue)
        : await addVariation(newValue);

      if (response) {
        resetForm();
        dispatch(setModalOpen(false));
        dispatch(fetchVariations());
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

export default AddVariationsContainer;
