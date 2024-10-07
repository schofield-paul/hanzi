import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleSignInButton = () => {
  const handleSuccess = (response: any) => {
    console.log("Login Success!");
  };

  const handleFailure = () => {
    console.error("Google Sign In failed");
  };
  return <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />;
};

export default GoogleSignInButton;
