//'use client'


import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Optional if you want pagination
import "swiper/css/grid";
//modules
import  {Autoplay,Grid,  Pagination} from "swiper/modules" // Import Autoplay module
import ServiceCard from './ServiceCard';

type ServiceListProps = {
  services: ServiceCard[];
};

const ServiceList = ({services}: ServiceListProps) => {
    

  return (
    <Swiper
  
                 modules={[Autoplay ,Grid, Pagination]} // Add Autoplay module here
                 autoplay={{
                   delay: 4500, // Delay between transitions in milliseconds
                   disableOnInteraction: false, // Autoplay will not be disabled after user interactions
                         }}
                  pagination={{
                  dynamicBullets: true,
                         }}
                  grid={{
                       rows: 2,
                    }
                    
                    }
                 breakpoints={{
                  200:{
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
              
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  }
                 }}
                 className=' lg:h-[560px]'
    >
      {services.map((service, index) => (
        <SwiperSlide key={index} className=' p-4'>
          <ServiceCard
            speciality={service.speciality}
            desc={service.desc}
            bgColor={service.bgColor}
            textColor={service.textColor}
            icon={service.icon}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ServiceList
