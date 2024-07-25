import React from "react";
import "../style/homeCard.css";
import image1 from "../assets/images/1.png";
import image2 from "../assets/images/2.png";
import image3 from "../assets/images/3.png";
import image4 from "../assets/images/4.png";

const HomeCard = () => {
  const houses = [
    {
      id: 1,
      country: "nepal",
      city: "Kathmandu",
      price: 20000,
      image: image1,
    },
    {
      id: 2,
      country: "nepal",
      city: "Kathmandu",
      price: 20000,
      image: image2,
    },
    {
      id: 3,
      country: "nepal",
      city: "Kathmandu",
      price: 20000,
      image: image3,
    },
    {
      id: 4,
      country: "nepal",
      city: "Kathmandu",
      price: 20000,
      image: image4,
    },
  ];
  return (
    <div id="HomeCard">
      <div
        id="houses"
        className="d-flex justify-content-between my-5 flex-wrap"
      >
        {houses.map((item, index) => {
          return (
            <div class="card" key={index}>
              <img src={item.image} class="card-img-top" alt="..." />
              <div class="card-body">
                <p class="card-text">
                  <span>Price:</span>
                  {item.price}
                </p>
                <p class="card-text">
                  <span>City:</span>
                  {item.city}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCard;
