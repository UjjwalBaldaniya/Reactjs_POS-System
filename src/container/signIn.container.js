import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignInContainer = () => {
  const navigate = useNavigate();
  const language = useSelector((state) => state?.language?.language);

  const authUser = localStorage.getItem("auth_token");

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  return { language, navigateToSignUp, navigateToDashboard };
};

export default SignInContainer;
