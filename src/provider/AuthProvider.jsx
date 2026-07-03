import { useState } from "react";
import { UseContext } from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [searchMovie, setSearchMovie] = useState("");

  const userInfo = {
    setSearchMovie,
    searchMovie,
  };

  return <UseContext value={userInfo}>{children}</UseContext>;
};

export default AuthProvider;
