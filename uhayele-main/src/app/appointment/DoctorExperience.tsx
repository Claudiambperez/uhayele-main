import React from 'react'

import { GoInfo } from "react-icons/go";

type DoctorExperienceProps = {
  experience: string; 
  degree: string;
  fees: number; 
  //totalPatients: number;
  speciality: string;
  currencySymbol: string;
}

const DoctorExperience = ({experience, degree, fees,  speciality, currencySymbol}: DoctorExperienceProps) => {
  return (
    <div className=' bg-white rounded-lg shadow-md flex-1 sm:mx-0 '>
        <h1 className='text-white z-20 px-2 bg-sex py-2 medium-16 flex gap-2'>Sobre <span className=' py-[3px]'><GoInfo className='w-4.5 h-4.5' /> </span></h1>
        <div className='flex  py-4 px-2'>
           <div className='flex flex-col gap-4 w-1/2'>
            <p className='text-sec medium-14'>Especialidade: </p>
            <p className='text-sec regular-14'>{speciality}</p>
          </div>
          <div className='flex flex-col gap-4 w-1/2 px-'>
            <p className='text-sec medium-14'>Grau: </p>
            <p className='text-sec regular-14'>{degree}</p>
          </div>
           <div className='flex flex-col gap-4 w-1/2'>
            <p className='text-sec medium-14'>Anos: </p>
            <p className='text-sec regular-14 py-0.5 px-4.5 animate-pulse w-22 border border-[#F1D886] rounded-full'>{experience}</p>
          </div>
        </div>
             <div className='flex  py-4 px-2'>
        
           <div className='flex flex-col gap-4 w-1/2'>
            <p className='text-sec medium-14'>Quota: </p>
            <p className='text-sec medium-16 animate-pulse'>{fees} <span className='text-red-500 bold-16'>{currencySymbol} </span> </p>
          </div>
        </div>
      
    </div>
  )
}

export default DoctorExperience
