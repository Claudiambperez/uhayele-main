
import { HoverEffect } from '@/components/ui/card-hover-effect'
import React from 'react'
import { features } from '../../../../constants'

const Features = () => {
  return (
    <section className='relative max-container  lg:px-20  flex flex-col py-6 lg:mb-10 lg:py-10'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
            <h2 className='text-3xl  md:text-4xl font-bold text-sex mb-4'>
                Nossas Funcionalidades
            </h2>
              <p className='text-muted-foreground dark:text-muted-foreground text-lg max-w-2xl mx-auto'>
                Explore as funcionalidades do Uhayele, projetadas para simplificar sua jornada de saúde.
              </p>
        </div>
         <div>
           <div className="max-w-8xl mx-auto px-12">
        <HoverEffect items={features} />
    </div>
         </div>
      </div>
    </section>
  )
}

export default Features
