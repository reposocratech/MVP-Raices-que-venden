import { Row, Col } from 'react-bootstrap';
import './adminappointmentlis.css';
import { Boton } from '../Boton/Boton';
import notAvatar from '../../../public/icons/notAvatar.png';
import { useState } from 'react';

export const AdminAppointmentList = ({
  appointments,
  setAppointments,
  statusFilter,
  onCanceled,
  onConfirm,
}) => {
  const [view, setView] = useState(0);

  const handleChangeStatus = (statusNumbre) => {
    let status = '';
    if (statusNumbre === 1) {
      status = 'Pendiente';
    } else if (statusNumbre === 2) {
      status = 'Confirmada';
    } else if (statusNumbre === 3) {
      status = 'Cancelada';
    }
    return status;
  };

  const handleBorder = (n) => {
    let clase = 'card-list';

    if (n === 1) {
      clase = 'card-list pendding';
    } else if (n === 2) {
      clase = 'card-list confirm';
    } else if (n === 3) {
      clase = 'card-list canceled';
    }

    return clase;
  };

  const handleStatusText = (n) => {
    let clase = 'text-md-center';

    if (n === 1) {
      clase += ' pendding-text';
    } else if (n === 2) {
      clase += ' confirm-text';
    } else if (n === 3) {
      clase += ' canceled-text';
    }

    return clase;
  };

  const handleFilter = (statusNumbre) => {
    setView(statusNumbre);

    if (statusNumbre === 0) {
      return setAppointments(statusFilter.filter((e) => e));
    } else if (statusNumbre === 1) {
      return setAppointments(statusFilter.filter((e) => e.app_status === 1));
    } else if (statusNumbre === 2) {
      return setAppointments(statusFilter.filter((e) => e.app_status === 2));
    } else if (statusNumbre === 3) {
      return setAppointments(statusFilter.filter((e) => e.app_status === 3));
    }
  };

  return (
    <div className="lista-citas px-3 ">
      <Row>
        <ul className="lista-filter">
          <li
            className={view === 0 ? 'active-0' : ''}
            onClick={() => handleFilter(0)}
          >
            <i className="bi bi-arrow-clockwise"></i> Todas
          </li>
          <li
            className={view === 1 ? 'active-1' : ''}
            onClick={() => handleFilter(1)}
          >
            <i className="bi bi-clock"></i> Pendientes
          </li>
          <li
            className={view === 2 ? 'active-2' : ''}
            onClick={() => handleFilter(2)}
          >
            <i className="bi bi-check2-circle"></i> Confirmadas
          </li>
          <li
            className={view === 3 ? 'active-3' : ''}
            onClick={() => handleFilter(3)}
          >
            <i className="bi bi-x-circle"></i> Canceladas
          </li>
        </ul>
      </Row>

      {appointments.map((e) => {
        return (
          <Row key={e.appointment_2_id} className={handleBorder(e.app_status)}>
            <Col lg={1} md={1} sm={12}>
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
            <Col lg={2} md={4} sm={12}>
              <p className="m-0">
                {e.user_name ? e.user_name : 'Sin nombre'} 
                {' '}
                {e.last_name ? e.last_name  : 'Sin Apellidos'}</p>
            </Col>
            <Col lg={2} md={4} sm={12}>
              <p className="m-0 ">{e.email}</p>
            </Col>
            <Col lg={1} md={3} sm={4}>
              <p className="m-0">{e.phone_number}</p>
            </Col>
            <Col lg={1} md={6} sm={4}>
              <p className="m-0 text-lg-center text-md-center">{e.app_date}</p>
            </Col>
            <Col lg={2} md={6} sm={4}>
              <p className="m-0 text-lg-center">
                {e.app_hour}:00 - {e.app_hour + 1}:00
              </p>
            </Col>
            <Col lg={1} md={6} sm={6}>
              <p className={handleStatusText(e?.app_status)}>
                {handleChangeStatus(e.app_status)}
              </p>
            </Col>
            <Col lg={2} md={6} sm={6} className="d-flex gap-2 justify-content-end">
              {e.app_status !== 2 && (
                <Boton
                  aspecto="btn-rounded-ok"
                  icon="bi bi-check2"
                  onClick={() => onConfirm(e.appointment_2_id)}
                />
              )}

              {e.app_status !== 3 && (
                <Boton
                  aspecto="btn-rounded-err"
                  icon="bi bi-x-circle"
                  onClick={() => onCanceled(e.appointment_2_id)}
                />
              )}
            </Col>
          </Row>
        );
      })}
    </div>
  );
};
