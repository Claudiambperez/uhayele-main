import React from 'react'
import { words } from '../../../../constants'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { assets } from '@/app/assets/images'
import Image from 'next/image'
import { motion } from 'motion/react'
import { AnimatedModalDemo } from '@/app/Components/Modal'

const Hero = () => {
  return (
    <section className='px-4 py-10 md:py-20' >
        <div className='max-container padding-container  flex flex-col     md:gap-28 lg:py-20 xl:flex-row'>
 {/*LEFT*/}
        <div className='relative z-20 flex flex-1 gap-4 flex-col xl:w-1/2  '>
         <h1 className=" text-xl mx-auto font-normal  bold-52 text-sex  ">
            <Image
    src={assets.sthetoscope}
    alt="stethoscope"
    className="absolute top-[-30px] w-18 h-18 lg:w-[50px] left-[-5px]"
  /> 
  <span className=''>
      {    
          "A Uhayele proporciona"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-1 inline-block"
              >
                {word}
              </motion.span>
              
            ))}
     <br />
    <TypingAnimation words={words} loop />
  </span>
        
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-1 text-justify text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Queremos acompanhar o seu bem-estar, por isso, oferecemos consultas médicas online,
            onde pode falar com um médico, psicólogo ou nutricionista, sem sair de casa.

        </motion.p>

          <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-2 flex flex-wrap  gap-12"
        >
         
                   <div className=' gap-16 flex flex-wrap'>
        <div className='flex items-center gap-2'>
          {Array(5).fill(1).map((_, index) => (
            <Image 
            src={ assets.star }
            key={index}
            alt='star'
            width={24}
            height={24}
            />
          ))
          }
        </div>
         <AnimatedModalDemo />
       </div>

          <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explorar Serviços
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Marcar Consulta
          </button>
        </motion.div>
     
        </div>
        
         {/*RIGHT*/}
 
           <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10  rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
          <iframe width="600" height="425" src="https://www.youtube.com/embed/mYtggWjZ0p0?si=kDmZcSDYWAgvAJA7&amp;controls=0" 
         title="YouTube video player"
      /*   frameborder="0"*/
         allow="accelerometer; 
         autoplay; clipboard-write;
         encrypted-media; gyroscope;
         picture-in-picture; web-share" 
         referrerPolicy="strict-origin-when-cross-origin"
         allowFullScreen
         className='rounded-lg shadow-lg' 
         >

         </iframe>
         
          </div>
        </motion.div>

  
        </div>
                    
    </section>
  )
}

export default Hero
{/*----------------------- HERO SECTION -------------------------------*/}
   <section className='max-container padding-container  flex flex-col     md:gap-28 lg:py-20 xl:flex-row  ' >
    
                               
    </section>
    {/*---------------------------- HERO END -------------------------------*/}