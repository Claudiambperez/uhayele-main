import { assets } from '@/app/assets/images'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { FiFileText } from 'react-icons/fi'
import { GiHospitalCross } from 'react-icons/gi'
import { ImLab } from 'react-icons/im'
import { people, peopleUrl } from '../../../../constants'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'



type facilitiesProps = {
  backgroundImage: string | StaticImageData;
  title: string;
  subtitle: string;
  facilities: string;
  icon?: React.ReactElement;
}

const EspecialitiesSite = ({backgroundImage, title, subtitle, facilities , icon} : facilitiesProps) => {
   return (
     <div className={` h-full w-full min-w-[600px]  xl:min-w-[800px] ${backgroundImage} bg-cover bg-no-repeat lg:rounded-r-4xl 2xl:rounded-4xl`} >
      <div className='flex h-full  flex-col items-start  justify-between p-6 lg:px-20 lg:py-10 '>
       <div className='flexCenter opacity-85 shadow-2xl shadow-black/[0.1] gap-4 w-60 rounded-full   '>
        <div className=' p-4'> 
            {icon }
        </div>
        <div className='flex flex-col gap-1'>
           <h4 className='bold-1 text-white text-shadow-2xs '>{title}</h4>
           <p className='regular-14 text-white text-shadow-2xs'>{subtitle}</p>
        </div>
       </div>
             <div className='flexCenter gap-6'>
          <span className='flex -space-x-2'>
          <AnimatedTooltip items={people} />
          </span>
            <h2 className='bold-1 text-shadow-2xs uppercase text-transparent  opacity-75 '>{facilities} </h2>
        </div>
      </div>
     </div>
   )
}
const Facilities = () => {
  return (
     <section className="relative max-container  lg:px-20  flex flex-col py-10 lg:mb-10 lg:py-14  ">
     <div className="hide-scrollbar flex h-[340px] w-full items-start  justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[420px] ">
       < EspecialitiesSite 
        backgroundImage = 'bg-facilitie1'
        title = 'Farmácias'
        subtitle ='Meditex, Maianga'
        facilities= '4+ aderiram'
        icon={<GiHospitalCross className='text-sex bold-1 w-4 h-4' />}
       /> 
         < EspecialitiesSite 
        backgroundImage = 'bg-facilitie2'
        title = 'Laboratórios'
        subtitle ='Aliva, Cligest'
        facilities= '8+ consultadas'
        icon={<ImLab className='text-sex bold-1 w-4 h-4' />}
       /> 
         < EspecialitiesSite 
        backgroundImage = 'bg-facilitie3'
        title = 'Exames'
        subtitle ='Centro Oncológico'
        facilities= '10+ examinados'
        icon={<FiFileText className='text-sex bold-1 w-4 h-4' />}
       /> 
       
     </div>
      <div className='flexEnd mt-10 px-6 lg:-mt-40 lg:mr-6'>
       <div className=' bg-ter opacity-88 shadow-lg   p-8 lg:max-w-[500px] xl:max-w-[464px] xl:rounded-5xl xl:px-12 xl:py-18 relative w-full overflow-hidden rounded-3xl'>
         <h2 className=' regular-24 md:regular-32 xl:regular-64 capitalize text-white'>
          <strong > Está sentindo-se mal</strong> e sem conseguir sair de casa?
         </h2>
         <p className='regular-14 xl:regular-16 mt-5  text-white text-justify'>
            Providenciamos os melhores serviços.
           Atendimento personalizado para todos. Nosso sistema oferece 
           um serviço inquestionável de saúde.
         </p>
         <Image
          src={assets.quote}
          alt='quote'
          width={186}
          height={219}
          className='absolute -right-6 bottom-4 w-[140px] lg:bottom-10 xl:-right-8 xl:w-[186px] 3xl:right-0'
          />

       </div>
      </div>
     </section>
  )
}

export default Facilities
