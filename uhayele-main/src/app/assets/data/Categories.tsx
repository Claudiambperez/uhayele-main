import { assets } from "../images";
import Image from "next/image";

//SERVICES
export const categories = [
  {
    name: 'Odontologia',
    img:   <Image src={assets.oncology} fill className=" object-cover" alt="" />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui doloribus ipsa ipsum.'
  },
    {
    name: 'Exames',
    img:   <Image src={assets.diagnosis} fill className=" object-cover" alt="" />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui doloribus ipsa ipsum.'
  },
    {
    name: 'Cardiologia',
    img:     <Image src={assets.cardio} fill className=" object-cover" alt="" />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui doloribus ipsa ipsum.'
  },
    {
    name: 'Oftamologia',
    img:     <Image src={assets.oftamology} fill className=" object-cover" alt="" />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui doloribus ipsa ipsum.'
  },
    {
    name: 'Fisioterapia',
    img:     <Image src={assets.generalPhysician} fill className=" object-cover" alt="" />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui doloribus ipsa ipsum.'
  },
     {
    name: 'Hematologia',
    img:     <Image src={assets.hemathology} fill className=" object-cover" alt="" />,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui doloribus ipsa ipsum.'
  },
  
]