import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";

const MyTexts = () => {
  const {user, token} = useContext(AuthContext);
  const [userTexts, setUserTexts] = useState([]);

  useEffect(()=> {
    const getUserTexts = async () => {
      const userData = {user_id: user.user_id}

      const res = await fetchData('/user/getTexts', 'POST', userData, token);
      console.log(res);
      setUserTexts(res.data);
    }
    getUserTexts();
  }, []);

  return (
    <>
      <Container>
        <h2>Mis Textos</h2>
        <hr />
        {userTexts.map((text)=>{
          return(
            <h1>{text.text_title}</h1>
          )
        })}
      </Container>
    </>
  )
}

export default MyTexts;
