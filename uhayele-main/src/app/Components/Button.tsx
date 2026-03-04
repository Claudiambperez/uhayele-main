import React from 'react';

type ButtonProps = {
    type?: "button" | "submit" | "reset";
    title: string;
    icon?:  React.ElementType;
    variant: string;
}


const Button = ({ type, title,icon:Icon, variant} : ButtonProps) => {
  return (
    <button
    className={`flexCenter   rounded-full border ${variant}`}
    type={type }
    >
     {Icon && <Icon width={24} height={24} />} 
     <label className='bold-16 whitespace-nowrap '> {title} </label>
    </button>
  )
}

export default Button
