import { createContext, useEffect, useState } from "react"
import { fetchData } from "../helpers/axiosHelper";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [ texts, setTexts] = useState([]); //pensar nombre, si queremos cambiar habria que cambiarlo en login.jsx
  const [services, setServices] = useState([])

  useEffect(()=>{
   const loadServices = async () => {
    try {
      const result = await fetchData("/getServices", "GET");
      console.log(result);
      setServices(result.data);
    

    }catch (error){
      console.log(error);
    }
   };
   loadServices();

  }, []);

  return (
    <AuthContext.Provider value={{
                                  user,
                                  setUser,
                                  token,
                                  setToken,
                                  texts,
                                  setTexts,
                                  services,
                                  setServices,

                                }}>
      {children}
    </AuthContext.Provider>
  )
}
