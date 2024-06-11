import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInSingUp = ({ Component }) => {
  const navigate = useNavigate();
  const authUser = localStorage.getItem("authUser");
  console.log(
    "🚀 ~ file: SignInSingUp.jsx:5 ~ SignInSingUp ~ authUser:",
    authUser
  );

  useEffect(() => {
    if (authUser === "true") {
      // window.history.back();
      navigate("/dashboard");
    }
  }, [authUser, navigate]);
  return <Component />;
};
export default SignInSingUp;
