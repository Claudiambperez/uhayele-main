'use client'
import React from 'react'
import { assets } from '../assets/images'
import Image, { StaticImageData } from 'next/image'

import Button from '../Components/Button'
import { AiFillPlayCircle } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import { GiHospitalCross } from "react-icons/gi";
import { ImLab } from "react-icons/im";
import TestimonialModal from '../Components/TestimonialModal'
import { peopleUrl, services, words } from '../../../constants'
import About from './About'
import ServiceList from './Services/ServiceList'


//swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import Doctors from './Doctors/Doctors'
import FaqList from './FAQs'
import Link from 'next/link'
import { TypingAnimation } from '@/components/ui/typing-animation'
import HomePage from './Home'

type facilitiesProps = {
  backgroundImage: string | StaticImageData;
  title: string;
  subtitle: string;
  facilities: string;
  icon?: React.ElementType;
}

const EspecialitiesSite = ({backgroundImage, title, subtitle, facilities , icon: Icon} : facilitiesProps) => {
   return (
     <div className={` h-full w-full min-w-[600px]  xl:min-w-[800px] ${backgroundImage} bg-cover bg-no-repeat lg:rounded-r-4xl 2xl:rounded-4xl`} >
      <div className='flex h-full  flex-col items-start  justify-between p-6 lg:px-20 lg:py-10 '>
       <div className='flexCenter opacity-85 bg-ter gap-4 w-60 rounded-full   '>
        <div className=' p-4'> 
            {Icon && <Icon  className='text-sex bold-1 w-4 h-4' />} 
            
        </div>
        <div className='flex flex-col gap-1'>
           <h4 className='bold-1 text-white text-shadow-2xs '>{title}</h4>
           <p className='regular-14 text-white text-shadow-2xs'>{subtitle}</p>
        </div>
       </div>
             <div className='flexCenter gap-6'>
          <span className='flex -space-x-4 overflow-hidden'>
           { peopleUrl.map((img,index) => (
              <Image
                 className=' inline-block h-10 w-10 rounded-full border-2 border-ter'
                 src= {img.img}   
                 key={index}
                 alt='person' 
                 width={52}
                 height={52}  

                 />
              
           ) )

           }
          </span>
            <h2 className='bold-1 text-shadow-2xs uppercase text-transparent  opacity-75 '>{facilities} </h2>
        </div>
      </div>
     </div>
   )
}
const TEST = () => {
  return (
    <>
    <HomePage />
    </>
   
    
  )
}

export default TEST