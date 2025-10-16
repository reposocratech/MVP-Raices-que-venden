import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import { AdminCardService } from '../../../components/AdminCardService/AdminCardService';
import { Boton } from '../../../components/Boton/Boton';
import { CreateService } from '../../../components/Modals/CreateService/CreateService';
import { ModifyService } from '../../../components/Modals/ModifyService/ModifyService';
import { DeleteService } from '../../../components/Modals/DeleteService/DeleteService';
import './adminservice.css'

const AdminService = () => {
  const [services, setServices] = useState([]);
  const [showCreateService, setShowCreateService] = useState(false);
  const [showModifyService, setShowModifyService] = useState(false);
  const [showDeleteService, setShowDeleteService] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const {token} = useContext(AuthContext);

  useEffect( ()=>{
    const getServices = async() => {
      const result = await fetchData('/admin/getServices', 'GET', null, token);
      setServices(result.data);
    }
    getServices();
  }, [])

  
  const alterVisible = async (serviceData) => {
    const {service_id} = serviceData;
    const newVisibility = await fetchData('/admin/alterVisible', 'PUT', serviceData, token);
    setServices(prevServices=>prevServices.map((service)=>service.service_id!==service_id?service:{...service, is_visible: newVisibility.data}));
    
  }

  const modify = (serviceData) => {
    setSelectedService(serviceData);
    setShowModifyService(true);
  }

  const handleCloseEdit = () => {
    setShowModifyService(false);
    setSelectedService(null);
  }

  const deleteService = (serviceData) => {
    setSelectedService(serviceData);
    setShowDeleteService(true);
  }

  const handleCloseDelete = () => {
    setShowDeleteService(false);
    setSelectedService(null);
  }

  return (
    <Container className='container-services'>
      <h2 className='title-admin'>Panel de servicios</h2>
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
                              alterVisible={()=>alterVisible({service_id: service.service_id, is_visible: service.is_visible})}
                              modify={()=>modify(service)}
                              deleteService={()=>deleteService(service)}

              />
            </Col>
          )
        })}
      </Row>
      <CreateService show={showCreateService} close={()=>setShowCreateService(false)} setServices={setServices}/>
      {selectedService && <ModifyService show={showModifyService} handleClose={handleCloseEdit} setServices={setServices} service={selectedService} deselect={()=>setSelectedService(null)}/>}
      {selectedService && <DeleteService show={showDeleteService} handleClose={handleCloseDelete} setServices={setServices} service={selectedService} deselect={()=>setSelectedService(null)}/>}
    </Container>
  )
}

export default AdminService;