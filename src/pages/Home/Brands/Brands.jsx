import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';


const brandLogos = [amazon, amazon_vector, casio, moonstar, randstad, star, start_people]


const Brands = () => {
    const slidesPerView = 4;
    const canEnableLoop = brandLogos.length > slidesPerView;

    return (
        <Swiper
        loop={canEnableLoop}
        slidesPerView={slidesPerView}
        slidesPerGroup={1}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{
            delay: 1000,
            disableOnInteraction: false
        }}
        >
            <div className='mb-24 p-8'>
            {
                brandLogos.map((logo, index) => <SwiperSlide key={index}>
                    <img src={logo} alt="" />

                </SwiperSlide>)
            }
             {/* <SwiperSlide>Slide 1</SwiperSlide>  */}
             </div>
            
        </Swiper>
    );
};

export default Brands;