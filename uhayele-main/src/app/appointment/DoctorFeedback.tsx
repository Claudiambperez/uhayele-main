import Image from 'next/image';
import React from 'react'
import { FcFeedback } from 'react-icons/fc'
import { assets } from '../assets/images';
import { formatDate } from '../../../lib/utils';


const DoctorFeedback = () => {
/*  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };*/
  return (
     <div className=' bg-white rounded-lg shadow-md'>
             <h1 className='text-white z-20 px-2 bg-sex py-2 medium-16 flex gap-2'>Feedback <span className=' py-[3px]'><FcFeedback className='w-4.5 h-4.5' /> </span></h1>
                  <div className='flex flex-col  py-4 px-2'>
                    <p className='text-sec bold-16 leading-8'>Todas as avaliações  </p>
                    <div className='flex  justify-between gap-10 mb-[30px]'>
                      <div className="flex gap-3">
                        <figure className="w-10 h-10 rounded-full ">
                            <Image className='w-full' src={assets.avatar} alt='avatar' />
                        </figure>
                         <div className="">
                            <h5 className='bold-16 text-sec leading-6 '>Mariana Alves</h5>
                            <p className='text-sec'>{ formatDate('02-14-2024')} </p>
                          
                         </div>
                           <p className=' regular-14 text-sec leading-6'>
                            Bons serviços, altamente recomendado
                            </p>
                      </div>

                    </div>
               </div>
        </div>
  )
}

export default DoctorFeedback
