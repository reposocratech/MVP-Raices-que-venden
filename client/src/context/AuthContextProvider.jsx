import { createContext, useEffect, useState } from "react"
import { fetchData } from "../helpers/axiosHelper";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [services, setServices] = useState([])

  /* console.log("Desde el AuthContext" , user , token) */

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  useEffect(() => {

    let tokenLocalStorage = localStorage.getItem("token");

    if (tokenLocalStorage) {  
      const fetchUser = async() => {
        try {
          const res = await fetchData('/user/getUserToken', 'GET', null, tokenLocalStorage);
          setUser(res.data.user);
          setToken(tokenLocalStorage);

        } catch (error) {
          console.log(error)
        }
      }

      fetchUser()
      
    }
  },[])
  

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
    <AuthContext.Provider 
      value={{
               user,
               setUser,
               token,
               setToken,
               services,
               setServices,
               logOut
               }}>
    
      {children}
    </AuthContext.Provider>
  )
}
