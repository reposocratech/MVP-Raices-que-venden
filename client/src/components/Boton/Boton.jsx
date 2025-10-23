import './boton.css';

export const Boton = ({aspecto, icon, onClick, valor, type, disabled}) => {
    return(
        /* 
            Usar clases personalizadas:
            1 - Propiedad {aspecto}, deben de usar las siguientes clases: 
            * btn-1
            * btn-2
            * btn-3 
            * btn-4

            Nota: Si quieres personalizar alguna clase, sigue la numeración correcta, añadiendo un número más como las que están creadas.

            2 - Propiedad {icon}, esta creada para los iconos de bootstrap. Se añade las clases de los iconos como este ejemplo: "bi bi-link".

            3 - Propiedad {valor}, es para añadir el texto a los botones.

            4 - Propiedad {onClick}, es para insertar funciones.
        */
        <button 
            onClick={onClick} 
            className={aspecto}
            type={type}
            disabled={disabled}
        >
            {icon && <i className={icon}></i>}
            {valor}
        </button>
    )
}