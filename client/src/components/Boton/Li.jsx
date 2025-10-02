import { Nav } from 'react-bootstrap';
import './li.css';

/* 
    Usar clases personalizadas:

    1 - Propiedad {icon}, esta creada para los iconos de bootstrap. Se añade las clases de los iconos como este ejemplo: "bi bi-link".

    2 - Propiedad {active}, si está seleccionada.

    3 - Propiedad {valor}, es para añadir el texto al elemento de lista..
*/
export const Li = ({className, icon, active, valor, as, to, onClick}) => {
    return(
        <Nav.Link className={`li ${className}`} as={as} to={to} active={active} onClick={onClick}>
            {icon && <i className={icon}></i>}
            {valor}
        </Nav.Link>
    )
}