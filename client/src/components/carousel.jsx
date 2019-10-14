import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';

export const CarouselView = () => {
  return (
    <React.Fragment>
      <Carousel className='carousel'>
        <Carousel.Item>
          <img className='w-100' src={img1} alt='First slide' />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='w-100' src={img2} alt='Second slide' />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='w-100' src={img3} alt='Third slide' />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container>
        <h1>Hello World</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni atque
          corporis quisquam animi, et iste velit error odio? Enim consequatur
          quos, mollitia sunt molestias debitis aperiam autem non quidem libero.
        </p>
      </Container>
    </React.Fragment>
  );
};
