import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "./app.css";

import pg1 from "./assets/pg1.png";
import pg2 from "./assets/pg2.png";
import pg3 from "./assets/pg3.png";

export default function Slider() {
    return (
        <div className="slider-container">
            <Swiper
                modules={[Navigation]}
                navigation={true}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                effect="slide"
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={pg1} alt="PG 1" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pg2} alt="PG 2" />
                </SwiperSlide>

                <SwiperSlide>
                    <img src={pg3} alt="PG 3" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
