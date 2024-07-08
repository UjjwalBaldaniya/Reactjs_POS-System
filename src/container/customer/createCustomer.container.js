import { useNavigate } from "react-router-dom";

const CreateCustomerContainer = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/customers");
  };

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
  };

  const handleSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    alert(JSON.stringify(values, null, 2));
  };

  return { handleBack, initialValues, handleSubmit };
};

export default CreateCustomerContainer;
