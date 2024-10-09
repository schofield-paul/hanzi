import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface GoogleSignInButtonProps {
  onLogin: (token: string) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onLogin }) => {
  const handleSuccess = async (response: any) => {
    const googleToken = response.credential;
    try {
      const res = await axios.post("http://localhost:3005/auth/google", {
        token: googleToken,
      });
      const jwtToken = res.data.token;
      localStorage.setItem("token", jwtToken);
      console.log("Login Success:");
      onLogin(jwtToken);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleFailure = () => {
    console.error("Google Sign-In failed");
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />;
};

export default GoogleSignInButton;
