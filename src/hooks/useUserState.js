import { useContext, createContext, useState } from "react";

const UserStateContext = createContext({
  name: '',
  email: '',
  password: '',
  color: '',
  terms: false,
  setUserInfo: () => {},
  setMoreInfo: () => {},
  submitInfo: () => {}
});

export const UserStateProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('');
  const [terms, setTerms] = useState(false);

  const setUserInfo = ({ name, email, password }) => {
    setName(name);
    setEmail(email);
    setPassword(password);
  };

  const setMoreInfo = ({ color, terms }) => {
    setColor(color);
    setTerms(terms);
  };

  const submitInfo = () => {

  }

  return (
    <UserStateContext.Provider value={{
      name,
      email,
      password,
      color,
      terms,
      setUserInfo
    }}>
      {children}
    </UserStateContext.Provider>
  )
};

export const useUserState = () => {
  return useContext(UserStateContext);
}