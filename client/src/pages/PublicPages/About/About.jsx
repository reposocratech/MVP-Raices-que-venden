import { Col, Container, Row } from 'react-bootstrap';
import './about.css';
import { Carrousel } from '../../../components/Carrousel/Carrousel';

const About = () => {
  return (
    <section className="section-about">
      <Container className="about">
        <h1 className='h1-about'>Conoce a Almudena: La Esencia de Almuyalma</h1>
        <Row className="div-row">
          <Col className="about-img" sm={12} md={6}>
            <Carrousel />
            <p>
              “Contar la historia de un pueblo es mantener vivo su futuro. Y esa
              es mi misión.”
            </p>
          </Col>
          <Col className="about-text" sm={12} md={6}>
            <h2>Una historia con raíces</h2>
            <p>
              <span className="fw-semibold">Almuyalma</span> nace de la
              convicción de que la 
              <span className="fw-semibold"> historia y la identidad</span> de un
              proyecto rural son su activo más valioso. Soy Almudena y mi
              compromiso es traducir la pasión que pones en tu tierra y tu
              oficio con textos que resuenen con tu público.
            </p>
            <p>
              "Creo que el <span className="fw-semibold">copywriting</span> que
              tiene raíces, que horna la tradición y que está firmemente
              orientado a un futuro sostenible para el entorno rural. Trabajamos
              con el alma para sembrar palabras que florecen en ventas"
            </p>
            
          </Col>
        </Row>
        <br />
        <br />
        <Row className="div-row">
          <Col className="about-acordion">
          <h2 className='text-h2'>Más sobre nuestra historia</h2>
           
              <details className='accordion mb-1 about-text-acordion'>
                <summary className='h5 fw-semibold titleSum'>Nuevo lanzamiento “Raíces que venden”</summary>
                <p>
                  Soy Almudena Torres López, copywriter especializada en negocios
                  rurales y fundadora de Almuyalma, mi marca de servicios de
                  marketing que dirijo desde 2020.
                </p>
                
                <p>
                  Mi propósito es ayudar a
                  autónomos, emprendedores y empresas de entornos rurales a
                  comunicar su esencia, conectar con su comunidad y vender más
                  gracias a la fuerza de las palabras.
                </p>
              </details>
              
              <details className='accordion mb-1 about-text-acordion'>
                <summary className='h5 fw-semibold titleSum'>
                  Mi historia con el mundo rural
                </summary>
                <p>
                  Mi historia es personal y profesional. Durante años fui gestora del
                  Alojamiento Rural Isabel en Mondéjar (Guadalajara), donde descubrí
                  los retos reales de los pequeños negocios: atraer clientes,
                  diferenciarse y crecer en un entorno cada vez más digital.
                  Comprendí que la clave no era parecerse a las grandes empresas,
                  sino aprovechar la autenticidad y contar historias que conecten
                  con el cliente ideal.
                </p>
                
                <p>
                  En 2020 decidí profesionalizar esa visión y
                  formarme en copywriting de la mano de <span className='fw-semibold'>Javi Pastor</span>, uno de los
                  referentes nacionales en el sector. Su programa <span className='fw-semibold'>“Soy Copywriter”</span>
                  me dio las herramientas para transformar la comunicación en
                  estrategia, y desde entonces trabajo con empresas y marcas que
                  quieren transmitir confianza y vender sin perder sus raíces.
                </p>
                
                <p>
                  <span>
                    Con
                    Almuyalma he desarrollado proyectos de copywriting web con SEO
                    local, estrategias para redes sociales, campañas de email
                    marketing y branding emocional
                  </span>. Siempre con un enfoque claro: que
                  cada texto cuente una historia y que esa historia genere
                  resultados.
                </p>
              </details>

              <details className='accordion mb-1 about-text-acordion'>
                <summary className='h5 fw-semibold titleSum'>Mi experiencia</summary>
                <p>
                  Mi experiencia en recursos humanos, banca y
                  seguros me ha dado una visión más amplia del mercado y la
                  capacidad de adaptarme a diferentes sectores, comprendiendo la
                  importancia de la comunicación persuasiva y la gestión profesional
                  en contextos muy exigentes.
                </p>
              </details>


             <details className='accordion mb-1 about-text-acordion'>
               <summary className='h5 fw-semibold titleSum'>Nuestros objetivos</summary>
                <p>
                  Hoy mi trayectoria evoluciona con mi
                  proyecto más personal: <strong>“Raíces que venden”</strong>, seleccionado en el
                  programa <em>Move Up del CEEI Castellón</em>. Esta iniciativa nace con un
                  objetivo: <em>
                    impulsar a negocios rurales de la Comunidad Valenciana y
                    de toda España a dar el salto digital sin perder su esencia
                  </em>.
                </p>
               
                <p>
                  Con
                  estrategias de copywriting, storytelling y SEO local, quiero
                  ayudar a que productores locales, artesanos, alojamientos rurales
                  y pequeñas empresas transmitan su valor de forma auténtica y
                  consigan atraer a los clientes que de verdad los aprecian.
                </p>
               
                <p>
                  Creo firmemente que la autenticidad vende. Que cada
                  negocio tiene un alma y una raíz que merece ser contada. Y que el
                  copywriting puede convertirse en el motor que transforme esa raíz
                  en una ventaja competitiva.
                </p>
             </details>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
