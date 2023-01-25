import React from 'react'
import { useGlobalState } from '../../store'
import Card from './Card'
import { BiChevronDown,BiChevronUp } from 'react-icons/bi';



const Section = ({ title, items }) => {
  return (
    <div className='max-w-4xl mx-auto items-start self-center'>
      <div className='flex justify-center sm:justify-between max-w-4xl mx-5 text-gray-600'>
         <h3 className='font-medium text-lg text-gray-600 text-center sm:text-left' id={title}>{title}</h3>
         <p className='hidden sm:flex items-center cursor-pointer'>view more 
         <BiChevronDown className='text-2xl'/></p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-3 lg:gap-3 py-2.5 mx-4'>
        {items?.map((item,i)=>{
            const {}=item
                return(  
                    <Card key={i} item = {item}/>
                )
              })}
      </div>
    </div>
  )
}

export default Section