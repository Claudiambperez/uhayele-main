import { assets } from '@/app/assets/images'
import { WobbleCard } from '@/components/ui/wobble-card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import React from 'react'
import { PiCheckSquareFill } from 'react-icons/pi'
import { creditBenefits } from '../../../../constants'

const Pricing = () => {
  

  return (
      <section className='relative max-container  lg:px-20  flex flex-col py-10 lg:mb-10 lg:py-14 '>
         <div className='container mx-auto px-4'>
           <div className='text-center mb-16'>
             <Badge className=' bg-gray-50   border-black/[0.1] dark:bg-black dark:border-white/[0.2] border px-4 py-1 text-prim text-sm font-medium mb-4'> 
                Cuidados de saúde acessíveis
                </Badge>
               <h2 className='text-3xl  md:text-4xl font-bold text-prim mb-4'>
               
                   Pacote de Consultas
               </h2>
                 <p className='text-muted-foreground dark:text-muted-foreground text-lg max-w-2xl mx-auto'>
                Escolha o pacote de consultas perfeito que se adapta às suas necessidades de saúde.
                 </p>
           </div>
            <div>
           <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-gray-50 border-black/[0.1] dark:bg-black dark:border-white/[0.2] border dark:border-white/[0.2] min-h-[500px] lg:min-h-[300px]"
        className=""
      >
         <p className='text-xl font-bold relative z-20 mt-2 dark:text-white text-sex/[0.1]'>
          <Image src={assets.stethoscope} alt='stethoscope' width={50} height={50} className='inline-block mr-2 mb-2 shadow-xs rounded-lg'/>
                Como o nosso sistema de créditos funciona
            </p>
            <ul className='space-y-3'>
              {creditBenefits.map((benefit, index) => (
                <li key={index} className="flex gap-2 items-start">
                  <PiCheckSquareFill />
                  <p className="text-muted-foreground dark:text-white" dangerouslySetInnerHTML={{ __html: benefit }} />
                </li>
              ))}
            </ul>
      </WobbleCard>
            </div>
         </div>
       </section>
  )
}

export default Pricing
