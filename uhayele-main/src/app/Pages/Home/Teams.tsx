'use client'

import React from 'react'

//ANIMATION
import { motion } from "framer-motion"
//import { fadeIn } from "../../../../lib/variants"

//BUTTON
import CustomButtonDark from '../../Components/CustomButtonDark'

//DATA 
import { data } from '../../assets/data'

//DEPENDENCY
import Image from 'next/image';


/*const FlipCard: React.FC<{ member: Member }> = ({ member }) => (

  <div className="flip-container">
    <div className="flipper">
      <div className="front">
        <Image src={member.src} alt={member.alt} className={member.className} />
      </div>
      <div className="back">
        <div className={`text-center flex flex-col items-center ${member.className} border  border-quar p-8 text-quar uppercase font-light`}>
          <h3 className="mb-1 text-xl font-bold tracking-tight text-quar uppercase dark:text-white">
            {member.name}
          </h3>
          <p>{member.role}</p>
          <ul className="flex justify-center mt-4 space-x-4">
            {member.social.map((socialItem, idx) => {
              const Icon = socialItem.icon;
              return (
                <li key={idx}>
                  <a href={socialItem.href} target="_blank" rel="noopener noreferrer" className="text-four hover:text-gray-900 dark:hover:text-white">
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>

        </div>
      </div>
    </div>
  </div>
);
*/

const Teams: React.FC = () => {
  return (
  
  <section className= "py-12  xl:h-[110vh]" id="team">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between  gap-16 items-center flex-col lg:flex-row md:mt-20">      
                <motion.div
             //    variants={fadeIn('up', 0.4)}
                 initial = 'hidden'
                 whileInView = {'show'}
                   viewport={{ once: false, amount: 0.2 }}
                 className="w-full lg:w-1/2 lg:mt-0 md:mt-40 mt-16 max-lg:max-w-2xl">
                    <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 gap-8">     
                {data.teamMembers.map((member, index) => (
                    <div className="card " key={index}>
                        <div className="card-inner">
                            <div className="card-front">
                                <Image src={member.image} alt={member.name}  className='w-44 h-56 rounded-2xl object-cover' />
                            </div>
                            <div className="card-back  flex items-center border border-quar justify-center bg-transparent rounded-2xl">
                                <div className="text-center text-sec text-base">
                                    <h3 className='  font-bold '>{member.name}</h3>
                                    <p className='font-light'>{member.role}</p>       
                                    <ul className="flex justify-center mt-4 space-x-4">
                                          {member.social.map((socialItem, idx) => {
                                            const Icon = socialItem.icon;
                                               return (
                                                  <li key={idx}>
                                                     <a href={socialItem.href} target="_blank" rel="noopener noreferrer" className="text-sec hover:text-quar dark:hover:text-quar">
                                                      <Icon />
                                                      </a>
                                                       </li>
                         );
                         })}
                                   </ul>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
       


                    </div>
                </motion.div>
                    <motion.div
                // variants={fadeIn('up', 0.8)}
                 initial = 'hidden'
                 whileInView = {'show'}
                 viewport={{ once: false, amount: 0.2 }}
                 className="w-full lg:w-1/2"
              >
                
            <motion.h2
              //   variants={fadeIn('up', 0.6)}
                 initial = 'hidden'
                 whileInView = {'show'}
                 viewport={{ once: false, amount: 0.2 }}
                 className=" text-4xl text-ter font-bold leading-[4rem] mb-7 text-center lg:text-left">
                        A nossa equipa motivadora, forte e criativa
            </motion.h2>
            <motion.p 
         //    variants={fadeIn('up', 0.4)}
                 initial = 'hidden'
                 whileInView = {'show'}
                 viewport={{ once: false, amount: 0.2 }}
                 className="text-lg text-quar font-light mb-16 text-center lg:text-left">Estas pessoas trabalham para tornar a sua saúde e o nosso ecossistema
                  melhor.</motion.p>
  <CustomButtonDark
              containerStyles="w-[164px] h-[46px] rounded-md"
              text="Saber mais"
              />
             </motion.div>
            </div>
        </div>
    </section>
  
  )
}

export default Teams;
