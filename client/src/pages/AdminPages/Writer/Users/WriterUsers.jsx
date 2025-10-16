import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Image, Table, Badge } from 'react-bootstrap';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { Boton } from '../../../../components/Boton/Boton';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../../helpers/axiosHelper.js';
import notAvatar from '../../../../../public/icons/notAvatar.png';

import './writerUsers.css';

const WriterUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const {token} = useContext(AuthContext);

  useEffect( ()=>{
    const getUsers = async() => {
      /* const result = await fetchData('/admin/getServices', 'GET', null, token); */
      const result = await fetchData('/admin/getAllUsers', 'GET', null, token);
      console.log(result);
    
      setUsers(result.data.filter((user)=>user.type === 2));
    }
    getUsers();
  }, [])

  return (
    <Container className='container-writer-user'>
      <h2 className='title-admin'>Panel de usuarios textos</h2>
      <hr />
      <Table borderless hover responsive className='writer-users-table mt-4'>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Estado</th>
          <th>Escribir</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td data-label='Avatar'>
              <div  
                className='table-photo'
                >
                <img src={user?.avatar ? `${import.meta.env.VITE_SERVER_IMAGES}/users/${user.avatar}`: notAvatar} alt="" />
              </div>
            </td>
            <td data-label='Nombre'>{user.user_name}</td>
            <td data-label='Apellidos'>{user.last_name}</td>
            <td data-label='Correo'>{user.email}</td>
            <td data-label='Estado'>
                {user.is_deactivated ? "Inactivo" : "Activo"}
            </td>
            <td data-label='Escribir'>
                <Boton aspecto='btn-3' valor='ver textos' onClick={()=>navigate(`/admin/write/texts/${user.user_id}`)}/>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
  )
}

export default WriterUsers;