import { SiLinkedin, SiYoutube } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";


import  { StaticImageData }  from 'next/image';
import { assets } from "../images";

/*-----------Interface-----------*/

//SOCIAL MEDIA 
interface SocialLink {
  icon: React.ComponentType;
  href: string;
}

//MEMBER 
interface Member {
  image: string | StaticImageData;
  alt: string;
  className: string;
  name: string;
  role: string;
  social: SocialLink[];
}

/*------------------------------- */

//DOCTORS 
export const teamMembers: Member[] = [
  {
    image: assets.doctor_1,
    alt: "Team tailwind section",
    className: "w-44 h-56 rounded-2xl object-cover  md:mt-20 mx-auto min-[450px]:mr-0 ",
    name: 'Dr. Killian Chipalavela',
    role: 'Ginecologista',
    social: [
      { icon: SiLinkedin, href: 'https://www.linkedin.com/in/claudia-marina-b-702444137/' },
      { icon: RiTwitterXLine, href: 'http://twitter.com' },
      { icon: SiYoutube, href: 'http://youtube.com' },
    ],
  },
    { image: assets.doctor_2, 
     alt: "Team tailwind section", 
     className: "w-44 h-56 rounded-2xl object-cover mx-auto min-[450px]:ml-0 md:mx-auto",
     name: 'Dr. Mvambanu Correia',
     role: 'Cardiologista',
    social: [
        {icon: SiLinkedin, href: 'https://www.linkedin.com/in/claudia-marina-b-702444137/'},
        {icon: RiTwitterXLine, href: 'http://twitter.com'  },
        {icon: SiYoutube, href: 'http://youtube.com' }, 
    ],
 },
  { image: assets.doctor_3, 
     alt: "Team tailwind section",
     className: "w-44 h-56 rounded-2xl object-cover md:mt-20 mx-auto min-[450px]:mr-0 md:ml-0",
     name: 'Dr. Isaac Manuel',
     role: 'Oftamologista',
    social: [
        {icon: SiLinkedin, href: 'https://www.linkedin.com/in/claudia-marina-b-702444137/'},
        {icon: RiTwitterXLine, href: 'http://twitter.com'  },
        {icon: SiYoutube, href: 'http://youtube.com' }, 
    ],
 },
  { image: assets.doctor_4,
     alt: "Team tailwind section",
     className: "w-44 h-56 rounded-2xl object-cover mx-auto min-[450px]:ml-0 md:mr-0 md:ml-auto",
     name: 'Dra. Rayanne Vicente',
     role: 'Hematologista',
    social: [
        {icon: SiLinkedin, href: 'https://www.linkedin.com/in/claudia-marina-b-702444137/'},
        {icon: RiTwitterXLine, href: 'http://twitter.com'  },
        {icon: SiYoutube, href: 'http://youtube.com' }, 
    ],
    },
  { image: assets.doctor_5,
     alt: "Team tailwind section",
     className: "w-44 h-56 rounded-2xl object-cover md:-mt-20 mx-auto min-[450px]:mr-0 md:mx-auto",
     name: 'Dra. Adis Maturell',
     role: 'Nutricionista',
    social: [
        {icon: SiLinkedin, href: 'https://www.linkedin.com/in/claudia-marina-b-702444137/'},
        {icon: RiTwitterXLine, href: 'http://twitter.com'  },
        {icon: SiYoutube, href: 'http://youtube.com' }, 
    ],
    },
  { image: assets.doctor_6,
     alt: "Team tailwind section",
     className: "w-44 h-56 rounded-2xl object-cover mx-auto min-[450px]:ml-0 md:mr-0",
     name: 'Dra. Irmina Silva',
     role: 'Fisioterapeuta',
    social: [
        {icon: SiLinkedin, href: 'https://www.linkedin.com/in/claudia-marina-b-702444137/'},
        {icon: RiTwitterXLine, href: 'http://twitter.com'  },
        {icon: SiYoutube, href: 'http://youtube.com' }, 
    ],
    },
];

