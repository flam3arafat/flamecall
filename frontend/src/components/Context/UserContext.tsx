import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");
  const [isAuth, setIsAuth] = useState(true);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const data = window.localStorage.getItem("USER_INFO");
    setUserInfo(JSON.parse(data));
  }, []);
  useEffect(() => {
    const data = window.localStorage.getItem("TOKEN");
    setToken(JSON.parse(data));
  }, []);
  useEffect(() => {
    const data = window.localStorage.getItem("ID");
    setId(JSON.parse(data));
  }, []);
  useEffect(() => {
    const data = window.localStorage.getItem("IS_AUTH");
    setIsAuth(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("USER_INFO", JSON.stringify(userInfo));
  }, [userInfo]);
  useEffect(() => {
    window.localStorage.setItem("IS_AUTH", JSON.stringify(isAuth));
  }, [isAuth]);
  useEffect(() => {
    window.localStorage.setItem("TOKEN", JSON.stringify(token));
  }, [token]);
  useEffect(() => {
    window.localStorage.setItem("ID", JSON.stringify(id));
  }, [id]);

  const value = {
    userInfo,
    setUserInfo,
    isAuth,
    setIsAuth,
    token,
    setToken,
    id,
    setId,
  };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};

export default UserContext;
