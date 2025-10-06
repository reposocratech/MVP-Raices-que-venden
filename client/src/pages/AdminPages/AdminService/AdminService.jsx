import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import { AdminCardService } from '../../../components/AdminCardService/AdminCardService';
import { Boton } from '../../../components/Boton/Boton';
import { CreateService } from '../../../components/Modals/CreateService/CreateService';

const AdminService = () => {
  const [services, setServices] = useState([]);
  const [showCreateService, setShowCreateService] = useState(false); 
  const {token} = useContext(AuthContext);

  useEffect( ()=>{
    const getServices = async() => {
      const result = await fetchData('/admin/getServices', 'GET', null, token);
      setServices(result.data);
    }
    getServices();
  }, [])

  


  return (
    <Container>
      <h2>Panel de servicios</h2>
      <hr />
      <Boton aspecto='btn-3 ms-auto mb-3' valor='Añadir servicio' onClick={()=>setShowCreateService(true)}/>
      <Row className='justify-content-center g-4 mb-4'>
        {services.map((service)=>{
          return(
            <Col className='col-auto' key={service.service_id}>
              <AdminCardService
                              
                              name={service?.service_name}
                              description={service?.service_description}
                              image={service?.service_image}
                              price={service?.service_price}
                              is_visible={service?.is_visible}
              />
            </Col>
          )
        })}
      </Row>
      <CreateService show={showCreateService} handleClose={()=>setShowCreateService(false)} setServices={setServices}/>
    </Container>
  )
}

export default AdminService;