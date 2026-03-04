import React, { useContext } from 'react'


import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AppContext } from '@/app/context/AppContext'



const Doctors = () => {
    const router = useRouter()
    const  { doctors } = useContext(AppContext)
  return (
    <>
     <ul className='  flex grid-cols-auto gap-8 pt-8   sm:px-0   mt-4  '>
      { 
        doctors.slice(0,4).map((doctor,index) => (
                      <div onClick={() => router.push(`/appointment/${doctor.id}`)} className=' overflow-hidden  hover:translate-y-[10px] cursor-pointer group relative flex flex-col my-6  shadow-sm border border-slate-200 rounded-lg  max-w-68 hover:shadow-lg transition-shadow duration-300 ' key={index}>
                               <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                                <Image src={doctor.image} alt='doctor' className='h-70 transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110  ' />
                                    </div> 
                                <div className='p-4 '>
                                     <div className="mb-2 rounded-full bg-gray-600 py-1 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-60 text-center">
                                     <div className='flex gap-2 '>
                                         <span className='rounded-full top-1 relative w-2 h-2 bg-green-500'/>
                                       <p className='font-semibold'>Disponivel</p>
                                     </div>
                                        
                                  </div>
                                
                                     <p className='text-slate-800 text-xl font-semibold'>{doctor.name}</p>
                                   <p className='text-ter text-sm'>{doctor.speciality} </p>
                                </div>    
                              </div>
        ))
      
        }
     </ul>
    </>
   
  )
}

export default Doctors
