import { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = async (response: { credential: string }) => {
    const token = response.credential;
    try {
      const decoded = jwtDecode(token);
      setUser(decoded as any);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded as any);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  return { user, handleLoginSuccess, handleLogout };
}
