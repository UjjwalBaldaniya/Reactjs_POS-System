import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUpContainer = () => {
  const navigate = useNavigate();
  const language = useSelector((state) => state?.language?.language);

  const authUser = localStorage.getItem("auth_token");

  const navigateToSignIn = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    if (authUser) {
      navigate("/dashboard");
    }
  }, [authUser, navigate]);

  return { language, navigateToSignIn };
};

export default SignUpContainer;
