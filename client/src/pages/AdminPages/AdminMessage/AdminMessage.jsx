import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';
import notAvatar from '../../../../public/icons/notAvatar.png';
import './adminmessage.css';

const AdminMessage = () => {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [usersChat, setUsersChat] = useState([]);
  const [clientChat, setClientChat] = useState();
  const [chat, setChat] = useState([]);
  const [chatOrder, setChatOrder] = useState([])

  console.log(usersChat);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const result = await fetchData(
          '/admin/getAllUsers',
          'GET',
          null,
          token
        );
        setUsers(result.data);
        setUsersChat(result.data.filter((e) => e.user_id !== user.user_id));
      };
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchMessage = async (users) => {
        const result = await fetchData(
          '/admin/getMessage',
          'GET',
          users,
          token
        );
        /* console.log(result); */
      };
      fetchMessage(users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const openChat = async (idClient) => {
    try {
      const result = await fetchData(
        `/admin/getChat/${idClient}`,
        'GET',
        null,
        token
      );

      console.log(result)
      const { sender, recipient } = result.data;

      setClientChat(users.filter((e) => e.user_id === idClient));

      setChat([...sender, ...recipient]);
      setChatOrder(chat.sort((a,b) => a.message_date - b.message_date ))
    } catch (error) {
      console.log(error);
    }
  };
  console.log(chatOrder)

  console.log([clientChat]);
  console.log(chat);
  console.log(user);

  return (
    <Container className="chat-container">
      <h2>Chat</h2>

      <Row className="g-2">
        <Col lg={3}>
          <div className="column-user-chats">
            <input type="text" />
            {usersChat.map((e) => {
              return (
                <div key={e.user_id}>
                  <Row
                    className="card-user-chat"
                    onClick={() => openChat(e.user_id)}
                  >
                    <Col lg={2}>
                      <img
                        className="img-user-chat"
                        src={
                          e?.avatar
                            ? `${import.meta.env.VITE_SERVER_IMAGES}/users/${
                                e.avatar
                              }`
                            : notAvatar
                        }
                        alt="Avatar user"
                      />
                    </Col>
                    <Col>
                      <p className="m-0">
                        {e.user_name} {e.last_name}
                      </p>
                    </Col>
                  </Row>
                  <hr />
                </div>
              );
            })}
          </div>
        </Col>
        <Col lg={9}>
          <div className="chat">
            {clientChat?.map((e) => {
              return (
                <div key={e.user_id} className="header-chat">
                  <img
                    className="img-user-chat"
                    src={
                      e?.avatar
                        ? `${import.meta.env.VITE_SERVER_IMAGES}/users/${
                            e.avatar
                          }`
                        : notAvatar
                    }
                    alt="Avatar user"
                  />
                  <p className="m-0">
                    {e.user_name} {e.last_name}
                  </p>
                </div>
              );
            })}
            <hr />
            <div className="container-chat">
              <div className="message-chat">
                {chat.map((e) => {
                  return (
                    <div key={e.message_id}>
                      {clientChat[0]?.user_id === e.sender_user_id && (
                        <div className="client">
                          <span className='fecha'>{e.message_date}</span>
                          <p className='message'>{e.message_text}</p>
                        </div>
                      )}

                      {user?.user_id === e.sender_user_id && (
                        <div className="admin">
                          <span className='fecha'>{e.message_date}</span>
                          <p className='message'>{e.message_text}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <form className="form-chat">
                <input type="text" />
                <button>Enviar</button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminMessage;
