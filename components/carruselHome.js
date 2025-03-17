import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import "@/styles/carruselHome.module.css";

import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";

export default function CarruselHome() {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        // centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-96 bg-neutral-800 text-white flex justify-center items-center">1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-96 bg-neutral-800 text-white flex justify-center items-center">2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-96 bg-neutral-800 text-white flex justify-center items-center">3</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
