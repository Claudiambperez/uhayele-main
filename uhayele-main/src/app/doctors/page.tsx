'use client'

import React, { Suspense, useContext, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppContext } from '../context/AppContext'
import Image from 'next/image'
import { DOCTOR, services } from '../../../constants'

function FilterDoctors(){
    const router = useRouter()
  const searchParams = useSearchParams()
  
  const [speciality, setSpeciality] = useState<string | null>(null);
  
  useEffect(() => {
    setSpeciality(searchParams.get('speciality'));
  }, [searchParams]);

  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState<DOCTOR[]>([])

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => 
        doc.speciality.toLowerCase() === speciality.toLowerCase()
      ))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
     <div className=''>
        <div className="max-w-sm space-y-3 px-6">
          <input type="text" className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm shadow-md text-neutral-400 " placeholder="Pesquise os médicos especialistas " />
        </div>
          <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
            <ul className='flex flex-col gap-4 text-sm text-gray-500 px-6 '>
              {
                services.map((doctor, index) => (  
                  <li 
                    onClick={() => speciality === doctor.speciality ? router.push('/doctors') : router.push(`/doctors?speciality=${doctor.speciality}`)} 
                    className={`w-[96vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded cursor-pointer transition-all ${speciality === doctor.speciality ? 'bg-sex text-white' : ''}`} 
                    key={index}
                  >
                    {doctor.speciality} 
                  </li>
                ))
              }
            </ul>
            <div className=''>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-[-4px]'>
                {
                  filterDoc.map((doctor, index) => (
                    <div 
                      onClick={() => router.push(`/appointment/${doctor.id}`)} 
                      className='overflow-hidden hover:translate-y-[10px] cursor-pointer group relative flex flex-col my-6 shadow-sm border border-slate-200 rounded-lg max-w-68 hover:shadow-lg transition-shadow duration-300' 
                      key={index}
                    >
                      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                        <Image src={doctor.image} alt='doctor' className='h-70 transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110' />
                      </div> 
                      <div className='p-4'>
                        <div className="mb-2 rounded-full bg-gray-600 py-1 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-60 text-center">
                          <div className='flex gap-2'>
                            <span className='rounded-full top-1 relative w-2 h-2 bg-green-500'/>
                            <p className='font-semibold'>Disponivel</p>
                          </div>
                        </div>
                        <p className='text-slate-800 text-xl font-semibold'>{doctor.name}</p>
                        <p className='text-ter text-sm'>{doctor.speciality} </p>
                      </div>    
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
              </div>
  )
}

const DOCTORS = () => {

  return (
    <>
        <Suspense fallback={<p>Loading especialidades...</p>}>
         <FilterDoctors />
        </Suspense> 
  
    </>
  )
}

export default DOCTORS
