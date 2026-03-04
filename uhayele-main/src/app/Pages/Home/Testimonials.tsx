'use client'



//DEPENDENCY
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { testimonials } from "@/app/assets/data/Testimonial"



const Testimonial = () => {
  return (
    <section className=" relative max-container  lg:px-20  flex flex-col py-10 lg:mb-10 lg:py-14" id="testimonial"
    > <div className='container mx-auto px-4'>
           <div className='text-center mb-16'>
             <Badge className=' bg-gray-50   border-black/[0.1] dark:bg-black dark:border-white/[0.2] border px-4 py-1 text-sex text-sm font-medium mb-4'> 
                Histórias de sucesso
                </Badge>
               <h2 className='text-3xl  md:text-4xl font-bold text-sex mb-4'>
               
                   Testemunhos
               </h2>
                 <p className='text-muted-foreground dark:text-muted-foreground text-lg max-w-2xl mx-auto'>
                Relatos de pacientes e médicos sobre suas experiências com Uhayele.
                 </p>
           </div>
       
           <div className="h-[25rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
  
            </div>
         </div>

    </section> 
  )
}

export default Testimonial 