import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "14px",
        cursor: "pointer",
      }}
      onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;
