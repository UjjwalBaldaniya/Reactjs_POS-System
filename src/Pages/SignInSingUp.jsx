import React, { useEffect } from "react";

const SignInSingUp = ({ Component, language, setLanguage }) => {
  const authUser = localStorage.getItem("authUser");

  useEffect(() => {
    if (authUser === "true") {
      window.history.back();
    }
  }, []);
  return <Component language={language} setLanguage={setLanguage} />;
};
export default SignInSingUp;
