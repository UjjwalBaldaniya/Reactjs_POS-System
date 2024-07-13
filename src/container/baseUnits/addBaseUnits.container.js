import { useDispatch, useSelector } from "react-redux";
import { addBaseUnit, editBaseUnit } from "../../api/services/baseUnitsService";
import { fetchBaseUnits, setModalOpen } from "../../redux/slice/baseUnitSlice";

const AddBaseUnitsContainer = () => {
  const dispatch = useDispatch();
  const { baseUnitDataById = {}, isEdit } = useSelector(
    (state) => state?.baseUnit || {}
  );

  const initialValues = { name: baseUnitDataById?.base_unit_name || "" };

  const onModalClose = () => {
    dispatch(setModalOpen(false));
  };

  const handleSubmit = async (
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
        dispatch(setModalOpen(false));
        dispatch(fetchBaseUnits());
      }
    } catch (error) {
      setFieldError(
        "general",
        error.response?.data?.msg || "An error occurred"
      );
    }
    setSubmitting(false);
  };

  return { isEdit, initialValues, onModalClose, handleSubmit };
};

export default AddBaseUnitsContainer;
