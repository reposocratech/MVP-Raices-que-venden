import React from 'react'
import { Carousel } from 'react-bootstrap';
import './carrousel.css'

export const Carrousel = () => {
  return (
     <div className='carrousel'>
      <Carousel className='mt-5'>
        <Carousel.Item>
          <img
            className="d-block w-100 imgC"
            src="/image/almu1.jpg"
            alt="Foto 1"
           
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 imgC"
            src="/image/almu2.jpg"
            alt="Foto 2"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 imgC"
            src="/image/almu3.jpg"
            alt="Foto 3"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 imgC"
            src="/image/almu4.jpg"
            alt="Foto 4"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 imgC"
            src="/image/almu5.jpg"
            alt="Foto 5"
          />
        </Carousel.Item>
         <Carousel.Item>
          <img
            className="d-block w-100 imgC"
            src="/image/almu7.jpg"
            alt="Foto 7"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
  
}
