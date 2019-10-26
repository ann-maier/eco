import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";

import { AuthorCard } from "./authorCard";
import { KEEMPrinciples } from "./KEEMPrinciples";

export const CarouselView = () => {
  return (
    <React.Fragment>
      <Carousel className="carousel">
        <Carousel.Item>
          <img className="w-100" src={img1} alt="First slide" />
          <Carousel.Caption>
            <h3>Управління водними ресурсами</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-100" src={img2} alt="Second slide" />

          <Carousel.Caption>
            <h3>Комплексний еколого-економічний моніторинг</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-100" src={img3} alt="Third slide" />

          <Carousel.Caption>
            <h3>Управління відходами</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-100" src={img3} alt="Fourth slide" />

          <Carousel.Caption>
            <h3>Охорона земель</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-100" src={img3} alt="Fifth slide" />

          <Carousel.Caption>
            <h3>Атмосферне повітря</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-100" src={img3} alt="Sixth slide" />

          <Carousel.Caption>
            <h3>Здоров'я населення</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container>
        <Row className="justify-content-center mt-5 mb-5">
          <Col xs={4}>
            <AuthorCard />
          </Col>
          <Col xs={8}>
            <KEEMPrinciples />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
