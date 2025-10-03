import { createContext, useState } from "react"

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [ texts, setTexts] = useState([]); //pensar nombre, si queremos cambiar habria que cambiarlo en login.jsx
  

  return (
    <AuthContext.Provider value={{
                                  user,
                                  setUser,
                                  token,
                                  setToken,
                                  texts,
                                  setTexts
                                }}>
      {children}
    </AuthContext.Provider>
  )
}
