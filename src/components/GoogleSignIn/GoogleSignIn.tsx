import React from "react";
import { GoogleLogin } from "@react-oauth/google";

interface GoogleSignInButtonProps {
  onLogin: () => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onLogin }) => {
  const handleSuccess = (response: any) => {
    const token = response.credential;
    if (token) {
      localStorage.setItem("token", token);
      console.log("Login Success:");
      onLogin();
    }
  };

  const handleFailure = () => {
    console.error("Google Sign-In failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />;
};

export default GoogleSignInButton;
