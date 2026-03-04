'use client'
import Link from 'next/link'
import { BsArrowRight } from "react-icons/bs";

type ServiceCard = {
  speciality: string;
  desc: string;
  bgColor: string;
  textColor: string;
  icon?: React.ComponentType<{ className?: string }>;
};

const ServiceCard = ({ speciality, desc, bgColor, textColor, icon: Icon }: ServiceCard) => {
  return (
    <li className='flex w-full flex-shrink-0 hover:translate-y-[10px] transition-all duration-500 flex-col items-start border-2 border-ter rounded-md shadow-md'>
      <div className="flex gap-12 px-14 py-4">
        <div className={`rounded-full p-2`} style={{ background: bgColor }}>
          {Icon && <Icon className='text-white w-6 h-6' />}
        </div>
        <h2 className={`blod-20 lg:bold-32 capitalize py-2`} style={{ color: textColor }}>
          {speciality}
        </h2>
      </div>
      <p className='regular-14 px-6 text-justify bg-white/50 text-gray-500 lg:bg-none'>
        {desc}
      </p>
      <div className="flex justify-end py-2 px-68">
        <Link
          href={{
            pathname: '/doctors',
            query: { speciality: speciality }
          }}
          className="w-[36px] h-[36px] rounded-full 
            mx-auto flex items-center justify-center bg-[#B1A1C5]  text-white  group hover:border-[#B1A1C5] hover:border hover:bg-white  transition-all"
        >
          <BsArrowRight className="group-hover:text-[#B1A1C5] w-6 h-5" />
        </Link>
      </div>
    </li>
  );
};

export default ServiceCard;
