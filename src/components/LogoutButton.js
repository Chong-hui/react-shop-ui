import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "14px",
        cursor: "pointer",
      }}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }>
      Log Out
    </button>
  );
};

export default LogoutButton;
