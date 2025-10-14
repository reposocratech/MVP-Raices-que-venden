import { Container, Row, Col } from 'react-bootstrap';
import './adminusers.css';
import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import notAvatar from '../../../../public/icons/notAvatar.png';
import { Boton } from '../../../components/Boton/Boton';

const AdminUsers = () => {
  const { token } = useContext(AuthContext);
  const [view, setView] = useState(0);
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);

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
        setFilterUsers(result.data);
      };
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFilter = (statusNumbre) => {
    setView(statusNumbre);

    if (statusNumbre === 0) {
      return setUsers(filterUsers.filter((e) => e));
    } else if (statusNumbre === 1) {
      return setUsers(filterUsers.filter((e) => e.is_deactivated === 0));
    } else if (statusNumbre === 2) {
      return setUsers(filterUsers.filter((e) => e.is_deactivated === 1));
    }
  };

  const onActive = async (user_id) => {
    try {
      await fetchData('/admin/activeUser', 'PUT', { user_id }, token);
      /* setUsers(...users, users.map( e => e.user_id === user_id)) */
      const result = await fetchData('/admin/getAllUsers', 'GET', null, token);
      setUsers(result.data);
      setFilterUsers(result.data);
      console.log(users)
    } catch (error) {
      console.log(error);
    }
  };

  const onInactive = async (user_id) => {
    try {
      await fetchData('/admin/inactiveUser', 'PUT', { user_id }, token);

      /* setUsers(...users, users.map( e => e.user_id === user_id)) */
      const result = await fetchData('/admin/getAllUsers', 'GET', null, token);
      console.log(result)
      setUsers(result.data);
      setFilterUsers(result.data);
      console.log(users)
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <Container className="admin-users">
      <h2 className="title-admin">Gestión de usuarios</h2>
      <hr />
      <Row>
        <ul className="lista-filter">
          <li
            className={view === 0 ? 'active-0' : ''}
            onClick={() => handleFilter(0)}
          >
            <i className="bi bi-arrow-clockwise"></i> Todas
          </li>
          <li
            className={view === 1 ? 'active-2' : ''}
            onClick={() => handleFilter(1)}
          >
            <i className="bi bi-check2-circle"></i> Activos
          </li>
          <li
            className={view === 2 ? 'active-3' : ''}
            onClick={() => handleFilter(2)}
          >
            <i className="bi bi-x-circle"></i> Inactivos
          </li>
        </ul>
      </Row>

      {users.map((e) => {
        return (
          <Row key={e.user_id} className="card-list">
            <Col lg={1} md={2} sm={6}>
              <img
                className="avatar-appointment"
                src={
                  e?.avatar
                    ? `${import.meta.env.VITE_SERVER_IMAGES}/users/${e?.avatar}`
                    : notAvatar
                }
                alt="avatar user"
              />
            </Col>
            <Col lg={2} md={5} sm={6}>
              <p className="m-0">
                {e.user_name ? e.user_name : 'Sin nombre'}{' '}
                {e.last_name ? e.last_name : ' Sin Apellidos'}
              </p>
            </Col>
            <Col lg={3} md={5} sm={6}>
              <p className="m-0">{e.email}</p>
            </Col>
            <Col lg={1} md={4}>
              <p className="m-0">{e.phone_number}</p>
            </Col>
            <Col lg={1} md={4}>
              <p className="m-0">{e.type === 1 ? 'Admin' : 'Cliente/a'}</p>
            </Col>
            <Col lg={1} md={4}>
              <p className="m-0">
                {e.is_deactivated === 0 ? 'Activo' : 'Inactivo'}
              </p>
            </Col>
            <Col lg={1} md={4}>
              <p className="m-0">
                <a>Ver Perfil</a>
              </p>
            </Col>
            <Col lg={2} md={6} className="d-flex gap-2 justify-content-end">
              {e.is_deactivated === 1 && (
                <Boton
                  aspecto="btn-4"
                  icon="bi bi-check2"
                  valor="Activar"
                  onClick={() => onActive(e.user_id)}
                />
              )}

              {e.is_deactivated === 0 && e.type !== 1 && (
                <Boton
                  aspecto="btn-err-1"
                  icon="bi bi-x-circle"
                  valor="Desactivar"
                  onClick={() => onInactive(e.user_id)}
                />
              )}
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default AdminUsers;
