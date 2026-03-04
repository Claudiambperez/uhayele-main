import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type FAQ = {
    content : string,
    question: string
}
const FaqItem = ({question, content} : FAQ) => {
    const [isOpen, setIsOpen] = useState(false)
   
    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }
  return (
    <div className='p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5
    cursor-pointer'>
        <div className="flex items-center justify-between gap-5" onClick={toggleAccordion}>
          <h4 className=' text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-sex'>{question} </h4>
          <div className={`${isOpen && ' border border-solid border-[#F1D996]     bg-white'} w-7 h-7 lg:w-8 lg:h-8 text-white bg-[#F1D996] rounded
          flex items-center justify-center  `}>
         {isOpen ? <AiOutlineMinus className='text-black'/> : <AiOutlinePlus/>}
        </div>
        </div>

       {isOpen && <div className='mt-6'>
        <p className='text-[12px] font-[400] leading-6 lg:regular-16 lg:leading-7 text-gray-500'>{content}</p>
        </div>}  
      
    </div>
  )
}

export default FaqItem
