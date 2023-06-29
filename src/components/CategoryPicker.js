// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar } from "swiper";
import Tshirt from "../assets/Tshirt.jpg";
import aprons from "../assets/aprons.jpg";
import jakets from "../assets/jakets.jpg";
import kapuchone from "../assets/kapuchone.jpg";
import pens from "../assets/pens.jpg";
import towels from "../assets/towels.jpg";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "../blocks/swiper.css";

const categories = [
  {
    name: "חולצות",
    image: Tshirt,
  },
  {
    name: "ג'קטים",
    image: jakets,
  },
  {
    name: "קפוצ'ונים",
    image: kapuchone,
  },
  {
    name: "מגבות",
    image: towels,
  },
  {
    name: "סינרים",
    image: aprons,
  },
  {
    name: "עטים",
    image: pens,
  },
];

// import required modules

export default function CategoryPicker() {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={20}
      // Pagination={{
      //   clickable: true,
      // }}
      navigation={true}
      modules={[Navigation]}
      //Scrollbar={{ draggable: true }}
      className="mySwiper"
    >
      {categories.map((category) => (
        <SwiperSlide key={category}>
          <div className="category_picker__item">
            {category.name}
            <img className="" src={category.image}></img>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
