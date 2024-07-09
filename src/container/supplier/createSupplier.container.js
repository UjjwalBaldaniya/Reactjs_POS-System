import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addSupplier, editSupplier } from "../../api/services/supplierService";
import { fetchSupplierById, setEdit } from "../../redux/slice/supplierSlice";

const CreateSupplierContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { supplierDataById, isEdit } = useSelector((state) => state?.supplier);
  const { name, email, phoneno, address, city, country } =
    supplierDataById || {};

  const handleBack = () => {
    navigate("/suppliers");
  };

  const initialValues = {
    name: name || "",
    email: email || "",
    phoneNumber: phoneno || "",
    address: address || "",
    city: city || "",
    country: country || "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    setSubmitting(true);

    const newValue = {
      name: values.name,
      email: values.email,
      phoneno: values.phoneNumber,
      address: values.address,
      city: values.city,
      country: values.country,
    };

    try {
      const response = isEdit
        ? await editSupplier(id, newValue)
        : await addSupplier(newValue);

      if (response) {
        resetForm();
        navigate("/suppliers");
      }
    } catch (error) {
      setFieldError(
        "general",
        error.response?.data?.msg || "An error occurred"
      );
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSupplierById(id));
      dispatch(setEdit(true));
    }
  }, [dispatch, id]);

  return { handleBack, initialValues, handleSubmit };
};

export default CreateSupplierContainer;
