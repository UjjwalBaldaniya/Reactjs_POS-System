import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInSingUp = ({ Component, language, setLanguage }) => {
  const navigate = useNavigate();
  const authUser = localStorage.getItem("authUser");

  useEffect(() => {
    if (authUser === "true") {
      console.log("jkhguigujbguik");
      window.history.back();
    }
  }, []);
  return <Component language={language} setLanguage={setLanguage} />;
};
export default SignInSingUp;
