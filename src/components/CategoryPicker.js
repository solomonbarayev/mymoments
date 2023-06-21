// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

const categories = [
  "חולצות",
  "ג'קטים",
  "קפוצ'ונים",
  "תחתונים",
  "סנארים",
  "עטים",
];

// import required modules

export default function CategoryPicker() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category}>
            <div className="category-picker__item">{category}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
