//import React from 'react'

import { faqs } from "../../../../constants"
import FaqItem from "./FaqItem"

const FaqList = () => {
  return (
    <ul className="mt-[]">
    {
        faqs.map((item, index) => (
            <FaqItem question={item.question} content={item.content} key={index} />
        )) 
    }
      
    </ul>
  )
}

export default FaqList
