import Image from "next/image";
import { assets } from "../images";

//ADVANTAGES OF THE UHAYELE
export const featured = [
  {
    img: <Image src={assets.i24_7}  width={60} height={60}  alt='24/7' />,
    title: 'Disponibilidade toda hora e todo dia' , 
  },   

  {
    img: <Image src={assets.medicalRecord}  alt='medical records' />,
    title: 'Ficha médica sempre consigo' ,
  },

  { img:  <Image src={assets.labExam}  alt='medical records' />,
    title: 'Exames a uma distància de um click' ,
  },

 
]


//ANIMATION
export const assetsContentVariant  =  {
    hidden: { opacity: 0},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4,
            duration: 0.5,
            ease: 'linear',
        }
    }
}

export const assetsItem = {
    hidden: { y: 20, opacity: 0},
    show: {
        y: 0,
        opacity: 1,
        transition: {
           duration: 0.5,
           ease: [ 0.25, 0.6, 0.3,  0.8 ] ,
        },
    }
}

