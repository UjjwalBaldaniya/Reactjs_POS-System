import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return { handleBack };
};

export default useNavigation;
