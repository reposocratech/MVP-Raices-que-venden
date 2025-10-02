import { Container } from 'react-bootstrap';
import './writer.css';
import { Boton } from '../../../../components/Boton/Boton';

const Writer = () => {
  return (
    <>
      <Container>
        <form className="writer" action="">
          <label className='mb-3' htmlFor="">
            Nombre del documento
            <input type="text" />
          </label>
          {/* Cuando importemos react-md-editor, hay que adaptarlo */}
          <label className='mb-3' htmlFor="">
            Texto
            <input type="text" />
          </label>
          <div className="writer-buttons">
            <Boton aspecto='btn-err-1' valor='Cancelar'/>
            <Boton aspecto='btn-1' valor='Añadir archivo'/>
            <Boton aspecto='btn-1' valor='Publicar'/>
            <Boton aspecto='btn-3' valor='Guardar'/>
          </div>

        </form>
      </Container>
    </>
  )
}

export default Writer;
