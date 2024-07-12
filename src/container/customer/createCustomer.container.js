import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCustomer, editCustomer } from "../../api/services/customerService";
import { fetchCustomerById, setEdit } from "../../redux/slice/customerSlice";

const CreateCustomerContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customerDataById, isEdit } = useSelector((state) => state?.customer);
  const { name, email, phoneno, address, city, country } =
    customerDataById || {};

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id));
      dispatch(setEdit(true));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/customers");
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
        ? await editCustomer(id, newValue)
        : await addCustomer(newValue);

      if (response) {
        resetForm();
        navigate("/customers");
      }
    } catch (error) {
      setFieldError(
        "general",
        error.response?.data?.msg || "An error occurred"
      );
    }
    setSubmitting(false);
  };

  return { handleBack, initialValues, handleSubmit };
};

export default CreateCustomerContainer;
