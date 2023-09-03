import React from "react";
import {
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
} from "../assets/images";

export const Carousel = () => {
  return (
    <>
      <div
        id="telocambioCarrusel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#telocambioCarrusel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#telocambioCarrusel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#telocambioCarrusel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#telocambioCarrusel"
            data-bs-slide-to="3"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#telocambioCarrusel"
            data-bs-slide-to="4"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="img-container">
              <img src={carousel1} className="d-block w-100" alt="..." />
            </div>
          </div>
          <div className="carousel-item">
            <div className="img-container">
              <img src={carousel2} className="d-block w-100" alt="..." />
            </div>
          </div>
          <div className="carousel-item">
            <div className="img-container">
              <img src={carousel3} className="d-block w-100" alt="..." />
            </div>
          </div>
          <div className="carousel-item">
            <div className="img-container">
              <img src={carousel4} className="d-block w-100" alt="..." />
            </div>
          </div>
          <div className="carousel-item">
            <div className="img-container">
              <img src={carousel5} className="d-block w-100" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
