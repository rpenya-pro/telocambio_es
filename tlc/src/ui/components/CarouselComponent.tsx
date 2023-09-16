import { Carousel } from "react-bootstrap";
import {
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
} from "../../assets/images";

function CarouselComponent() {
  return (
    <Carousel id="telocambioCarrusel">
      <Carousel.Item>
        <img className="d-block w-100" src={carousel1} alt="Slide 1" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel2} alt="Slide 2" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel3} alt="Slide 3" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel4} alt="Slide 4" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carousel5} alt="Slide 5" />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
