import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../layout/slide.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TimetableMonth from './TimetableMonth';
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper';

import slide_image_3 from './assets/images/img_3.jpg';
import slide_image_4 from './assets/images/img_4.jpg';
import slide_image_5 from './assets/images/img_5.jpg';
import slide_image_6 from './assets/images/img_6.jpg';
import slide_image_7 from './assets/images/img_7.jpg';
import free from './assets/images/FREE.png';
import NewsPage from './NewsPage';

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

function MainCarousels() {

    return (
        <div>
            <h1 className="heading">환영합니다</h1>
            <img src={free || "http://via.placeholder.com/200x200"} style={{borderRadius: "15px"}}
                className='text-center my-3' />
            <div className="container my-3" style={{
                width: '1224px', height: '1000px'
            }}>
                <h1 className="heading">다양한 서비스를 찾아보세요!</h1>
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={2}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className="swiper">
                    <div className='imgbox'>
                        <SwiperSlide>
                            <img src={slide_image_4} alt="slide_image" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TimetableMonth style={{ height: "auto" }} />
                        </SwiperSlide>
                        <SwiperSlide style={{ height: "auto" }}>
                            <NewsPage />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={slide_image_3} alt="slide_image" />
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
        </div>
    );
}

export default MainCarousels;
