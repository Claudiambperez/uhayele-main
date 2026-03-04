//import React from 'react'


import Image from "next/image"
import Link from "next/link"
import { assets } from "../assets/images"
import { footer_links, socialLinks } from "../../../constants"


const Footer = () => {
  return (
    <footer className="flexCenter bg-gradient py-6 ">
      <div className="padding-container max-container flex w-full flex-col gap-14">
       <div className="flex  items-start justify-center gap-[10%] md:flex-row">
    <Link href='/' className="mb-10 flex flex-col ">
          <Image src={assets.logorb} alt="logo" width={74} height={29} />
          <p className="max-w-[200px] medium-14 text-white leading-12">
           Uhayele - o ecossistema que prioriza sua saúde e bem-estar primeiro.
          </p>
         </Link>
          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1 text-sex">
      
               
                {
              footer_links.map((columns) => (
                <FooterColumn title={columns.title} key={columns.title} >
                  {columns.links ? (
                    <ul className="regular-14 flex flex-col gap-4 text-white">
                      {
                        columns.links.map((link, index) => (
                          <Link href={link.path} key={index}>
                            {link.display}
                          </Link>
                        ))
                      }
                    </ul>
                  ) : (
                   <>
              
                     { columns.connect && (
                          <div  className="flex flex-col gap-8 max-w-[400]" >
                      
                        <Link className="flex gap-2" href={columns.connect.path}>
                         <span className="text-green-600 mt-[14px]  w-6 h-6"> {columns.connect.icon} </span>
                        <p className="text-gray-600 medium-14">  {columns.connect.phrase} </p>
                        </Link>
                  
                    
                      <ul className="flex gap-8 text-gray-700 ">
                         {socialLinks.map((social,index) => (
                          <Link href={social.path} key={index} className="h-16 w-16">{social.icon} </Link>
                         ))} 
                      </ul>
                       </div>
                     )

                     }
                           {columns.news && columns.news.length > 0  && (
                       <ul className="regular-14 flex flex-col gap-2 text-white">
                         {
                            columns.news.map((newsItenm, index) => (
                              //Apply to all excep the last index
                          
                             <li key={index} className={index === columns.news.length -1 ? 'leading-snug' : ' border-dotted border-b-1 border-gray-500'} >
                               <Link href={newsItenm.path} className=" flex flex-col gap-2 ">
                               <span className=" regular-14"> {newsItenm.title}</span>  <span className="text-gray-500"> ({newsItenm.year}) </span>
                               </Link>
                             </li>
                        ))
                         }
                       </ul>
                      
                     )

                     }
                   </>
                
                  )}
                </FooterColumn>
              ))
            }
           
          
          </div>
       </div>
           {/* Copyright */}
        <div className="text-fifth border-t border-dotted flex items-center justify-center mt-[-12px] relative">
      
           
              <span>&copy; Copyright 2024 CpDevelopment</span>
        </div>
      </div>
    </footer >

  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children} : FooterColumnProps) => {
  return (
      <div className="flex flex-col gap-5">
        <h4 className="bold-18 whitespace-nowrap">{title} </h4>
        {children}
      </div>
  )
}
export default Footer
