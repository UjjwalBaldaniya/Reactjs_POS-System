import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDropdownOptions } from "../../common/functions/getDropdownOptions";
import { fetchBaseUnits } from "../../redux/slice/baseUnitSlice";
import { fetchCategory } from "../../redux/slice/categorySlice";
import { fetchUnits } from "../../redux/slice/unitSlice";
import { fetchVariations } from "../../redux/slice/variationSlice";

const AddProductsContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryData } = useSelector((state) => state?.category);
  const { baseUnitsData } = useSelector((state) => state?.baseUnit);
  const { unitsData } = useSelector((state) => state?.unit);
  const { variationData } = useSelector((state) => state?.variation);

  const categoryOptions = getDropdownOptions(
    categoryData,
    "_id",
    "category_name"
  );
  const baseUnitOptions = getDropdownOptions(
    baseUnitsData,
    "_id",
    "base_unit_name"
  );
  const unitOptions = getDropdownOptions(unitsData, "_id", "unit_name");
  const variationNameOptions = getDropdownOptions(
    variationData,
    "_id",
    "variations_name"
  );

  const handleBack = () => {
    navigate("/products");
  };

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchBaseUnits());
    dispatch(fetchUnits());
    dispatch(fetchVariations());
  }, [dispatch]);

  return {
    categoryOptions,
    baseUnitOptions,
    unitOptions,
    variationNameOptions,
    variationData,
    handleBack,
  };
};

export default AddProductsContainer;
