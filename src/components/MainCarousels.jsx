import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../layout/slide.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TimetableMonth from './TimetableMonth';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import slide_image_1 from './assets/images/img_1.jpg';
import slide_image_2 from './assets/images/img_2.jpg';
import slide_image_3 from './assets/images/img_3.jpg';
import slide_image_4 from './assets/images/img_4.jpg';
import slide_image_5 from './assets/images/img_5.jpg';
import slide_image_6 from './assets/images/img_6.jpg';
import slide_image_7 from './assets/images/img_7.jpg';
import { Link } from 'react-router-dom';
import NewsPage from './NewsPage';

// ([EffectCoverflow, Pagination, Navigation]);



function MainCarousels() {

    return (
        <div className="container" style={{
            width: '1224px', height: '1000px'
        }}>
            <h1 className="heading">Flower Gallery</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 50,
                    modifier: 2.5,
                }}
                pagination={{ clickable: true }}
                navigation={true} // 내비게이션 활성화
                className="swiper_container"
                style={{ width: '50%', margin: '0 auto' }}
            >
                <div className='imgbox'>
                    <SwiperSlide style={{ height: "auto" }}>
                        <NewsPage />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TimetableMonth style={{ height: "auto" }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image_3} alt="slide_image" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image_4} alt="slide_image" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image_5} alt="slide_image" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image_6} alt="slide_image" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide_image_7} alt="slide_image" />
                    </SwiperSlide>

                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    );
}

export default MainCarousels;
