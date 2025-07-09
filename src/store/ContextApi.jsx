import React, { createContext, useContext, useState } from "react";

// Create a context
const ContextApi = createContext();

// Custom hook for easier context access
export const useMyContext = () => useContext(ContextApi);

// Provider component
export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("JWT_TOKEN"));
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("USER"))
  );
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("IS_ADMIN") === "true"
  );

  return (
    <ContextApi.Provider
      value={{ token, setToken, currentUser, setCurrentUser, isAdmin, setIsAdmin }}
    >
      {children}
    </ContextApi.Provider>
  );
};
