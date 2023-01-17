import { useContext, createContext, useState } from "react";

import { submitUserData } from "../api";

const UserStateContext = createContext({
  name: "",
  email: "",
  password: "",
  color: "",
  terms: false,
  submitted: false,
  submitError: false,
  setUserInfo: () => {},
  setMoreInfo: () => {},
  submitInfo: async () => {},
  resetUserState: () => {},
});

export const UserStateProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [terms, setTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const setUserInfo = ({ name, email, password }) => {
    setName(name);
    setEmail(email);
    setPassword(password);
  };

  const setMoreInfo = ({ color, terms }) => {
    setColor(color);
    setTerms(terms);
  };

  const submitInfo = async () => {
    // Make API Call
    try {
      setSubmitted(true);
      await submitUserData({
        name,
        email,
        password,
        color,
        terms,
      });
      setSubmitError(false);
    } catch (e) {
      setSubmitError(true);
      throw new Error(e);
    }
  };

  const resetUserState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setColor("");
    setTerms(false);
    setSubmitted(false);
  };

  return (
    <UserStateContext.Provider
      value={{
        name,
        email,
        password,
        color,
        terms,
        submitted,
        submitError,
        setUserInfo,
        setMoreInfo,
        submitInfo,
        resetUserState,
      }}
    >
      {children}
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  return useContext(UserStateContext);
};
