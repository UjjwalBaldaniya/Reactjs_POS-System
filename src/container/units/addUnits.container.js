import { useDispatch, useSelector } from "react-redux";
import { addUnit, editUnit } from "../../api/services/unitService";
import { fetchUnits, setModalOpen } from "../../redux/slice/unitSlice";

const AddUnitsContainer = () => {
  const dispatch = useDispatch();

  const { baseUnitsData, isModalOpen } = useSelector(
    (state) => state?.baseUnit
  );
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

  const onModalClose = () => {
    dispatch(setModalOpen(false));
  };

  const initialValues = {
    name: unitDataById?.unit_name || "",
    shortName: unitDataById?.unit_short_name || "",
    baseUnit: unitDataById?.base_unit_id?._id || "",
  };

  const handleSubmit = async (
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
        dispatch(setModalOpen(false));
        dispatch(fetchUnits());
      }
    } catch (error) {
      setFieldError(
        "general",
        error.response?.data?.msg || "An error occurred"
      );
    }
    setSubmitting(false);
  };

  return {
    isEdit,
    initialValues,
    handleSubmit,
    unitsFields,
    isModalOpen,
    onModalClose,
  };
};

export default AddUnitsContainer;
