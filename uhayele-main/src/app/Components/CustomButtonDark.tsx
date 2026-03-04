//import React from 'react'

const CustomButtonDark = ({
    text,
    containerStyles,
} : {
    text : string;
    containerStyles : string;
}) => {
  return (
    <button className={`${containerStyles} group relative cursor-pointer overflow-hidden bg-ter   uppercase`} > 
    {/* animation span*/}
     <span className=" ease absolute top-1/2 h-0 w-64 origin-center  
     -translate-x-20 rotate-45 bg-white transition-all duration-300 
      group-hover:h-64 group-hover:-translate-y-32 
     "></span>
     <span className=" ease relative  text-amber-300 opacity-100 transition duration-300
     "
  
      >{text} </span>
    </button>) 
}

export default CustomButtonDark
