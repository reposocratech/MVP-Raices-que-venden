import { useContext, useEffect, useRef, useState } from 'react';
import { Boton } from '../Boton/Boton';
import './popchat.css';
import { AuthContext } from '../../context/AuthContextProvider';
import { fetchData } from '../../helpers/axiosHelper';

export const PopChat = () => {
  const { user, token } = useContext(AuthContext);
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState('');
  const chatRef = useRef(null);

  setTimeout(() => {
    
  }, 2000);

  useEffect(() => {
    try {
      const fetchChat = async () => {
        const result = await fetchData('/user/getChat', 'GET', null, token);
        const { chatData } = result.data;
        setChat(chatData);
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      };
      fetchChat();
      
      const intervalo = setInterval(fetchChat, 1000);
      return () => clearInterval(intervalo);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setCurrentChat(e.target.value);
  };

  const sendCurrentChat = async (idRecipient) => {
    try {
      const currentChatData = {
        currentChat: currentChat,
        sender: user.user_id,
        recipient: idRecipient,
      };
      if (currentChatData.currentChat) {
        await fetchData('/user/sendCurrentChat', 'POST', currentChatData, token);

        setCurrentChat('');
  
        const result = await fetchData('/user/getChat', 'GET', null, token);
        const { chatData } = result.data;
        setChat(chatData);
      }
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mini-chat">
      <h4 className='title-chat'>Almudena Torres López</h4>
      <hr />

      <div className="container-chat " ref={chatRef}>
        {chat ? (
          chat.map((e) => {
            return (
              <div key={e.message_id}>
                {1 === e.sender_user_id && (
                  <div className="client">
                    <span className="fecha">{e.message_date}</span>
                    <p className="message">{e.message_text}</p>
                  </div>
                )}

                {user?.user_id === e.sender_user_id && (
                  <div className="admin">
                    <span className="fecha">{e.message_date}</span>
                    <p className="message">{e.message_text}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div>
            <h4>Empecemos a hablar</h4>
          </div>
        )}
      </div>
      <div className="form-chat">
        <textarea
          type="text"
          name="chat-body"
          value={currentChat}
          onChange={handleChange}
        />
        <Boton
          aspecto="btn-rounded-1 "
          icon="bi bi-send"
          onClick={() => sendCurrentChat(1)}
        />
      </div>
    </div>
  );
};
