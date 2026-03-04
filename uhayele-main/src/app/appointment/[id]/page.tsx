'use client'
import { AppContext } from '@/app/context/AppContext'
import { useParams, useSearchParams } from 'next/navigation'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { DOCTOR } from '../../../../constants'
import Image from 'next/image'
import DoctorAppointment from '../DoctorAppointment'
import DoctorExperience from '../DoctorExperience'
import DoctorFeedback from '../DoctorFeedback'
import { RiVerifiedBadgeFill } from 'react-icons/ri'


function FilterDoctorById() {
    const searchParams = useSearchParams()
   const doctorId = searchParams.get('id')
    const {id} = useParams()
   console.log("Doctor ID from params:", id); // Log the doctorId from params
   const {doctors, currencySymbol} = useContext(AppContext)


    const [doctorInfo, setDoctorInfo] = useState<DOCTOR | null>(null);
    // State to manage the active tab
    const [tab, setTab] = useState('appointment');
    const [docSlots, setDocSlots] = useState<string[]>([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState<string | null>(null);
   
   const fetchDocInfo = async () => {
       console.log("Doctor ID:", doctorId); // Log the doctorId
    const docInfo = doctors.find(doc => doc.id === id )
    setDoctorInfo(docInfo ? docInfo : null)
    console.log(docInfo)

   }

   const getAvailableSlots = async () => {
       setDocSlots([]);
       if (doctorInfo) {
         //  const slots = doctorInfo.slots;
           const currentTime = new Date();
         /*  const availableSlots = slots.filter(slot => {
               const slotDate = new Date(slot);
               return slotDate > currentTime;
           });
           setDocSlots(availableSlots);
           if (availableSlots.length > 0) {
               setSlotTime(availableSlots[0]);
           }*/
       }   
    }

   useEffect(() => {
       fetchDocInfo()
   }, [doctors,doctorId])
 
  useEffect(() => {
    getAvailableSlots();
  }, [doctorInfo]);

    
  return doctorInfo && (
    <div className='flex flex-col items-center justify-center h-[560px] '>
        {/*-------- Doctor Details -----------*/}
        <div className=' px-6 w-5xl h-[500px] border border-slate-200 rounded-lg shadow-md'>
            <div className='flex flex-col items-center justify-center h-full'>
                <div className='flex items-center justify-center gap-2  '>
                 <div className="relative h-40 w-1/3 m-2.5 overflow-hidden text-white rounded-md">                             
            {doctorInfo ? (
                   <Image
                    src={doctorInfo.image}
                    alt={doctorInfo.name} 
                    className='rounded-md transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110  '   />
               ) : (
                   <p>Carregando a info do Doctor...</p> // Fallback content
               )}
          </div> 
          <div className='flex flex-col gap-10  max-w-[680px] '>
          <h2 className='flex  gap-2'> {doctorInfo.name} <span className='py-[4px] h-2 w-2'><RiVerifiedBadgeFill /> </span> </h2>
           {/* <span className='text-white text-sm bg-sex py-1 px-6 lg:py-2 lg:px-6 leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>{doctorInfo.speciality} </span>*/}
             <p className='text-justify '>{doctorInfo.about} </p>
          </div>
        
                </div>
      
           <div className=' w-3/3 h-[290px] px-2 py-4 flex gap-6' >
          
                <ul className='flex flex-col gap-4 w-70 bg-slate-100 rounded-md h-2/3 py-2  px-2 transition-all duration-300 shadow-md z-10 '>
             <button onClick={() => setTab('experience')}  className={`${tab === 'experience' && 'z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-white shadow-md '}   py-2 px-5 mr-5 text-[16px] leading-7 text-sec font-semibold`} >Descrição</button>
             <button onClick={() => setTab('appointment')} className={`${tab === 'appointment' && 'z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-white shadow-md '}   py-2 px-5 mr-5 text-[16px]  leading-7 text-sec font-semibold`} >Agendamento</button>
             <button onClick={() => setTab('feedback')}    className={`${tab === 'feedback' && 'z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-white shadow-md'}   py-2 px-5 mr-5 text-[16px] leading-7 text-sec font-semibold`} >Feedback</button>

                </ul>
            <div className=' w-3/4 h-full rounded-md  overflow-y-auto'>
             {
                tab === 'experience'  && <DoctorExperience experience={doctorInfo.experience}  degree={doctorInfo.degree} fees={doctorInfo.fees} speciality = {doctorInfo.speciality} currencySymbol ={currencySymbol} />
             }
             {
                tab === 'appointment'  && <DoctorAppointment/>
             }
              {
                tab === 'feedback'  && <DoctorFeedback />
             }
            </div>
           
            
           
           </div>
            </div>
          
        </div>
     
        
    </div>
  )
    
}

const page = () => {
    return (
      <>
      <Suspense fallback={<p>Loading doctor details...</p>}>
        <FilterDoctorById />  
      </Suspense>
      </>
    )
}

export default page
