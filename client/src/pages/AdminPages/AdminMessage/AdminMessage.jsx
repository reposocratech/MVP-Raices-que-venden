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
        console.log(result);
      };
      fetchMessage(users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const openChat = async (idClient) => {
    try {
      const result = await fetchData(`/admin/getChat/${idClient}`, 'GET', null, token);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="chat-container">
      <h2>Chat</h2>
      <hr />
      <Row>
        <Col lg={3}>
          <h3>Usuarios</h3>
          {usersChat.map((e) => {
            return (
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
                    alt=""
                  />
                </Col>
                <Col>
                  {e.user_name} {e.last_name}
                </Col>
              </Row>
            );
          })}
        </Col>
        <Col lg={9}>
          <h3>Mensaje</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminMessage;
