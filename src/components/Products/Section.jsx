import React from 'react'
import { useGlobalState } from '../../store'
import Card from './Card'

const Section = ({ title, items }) => {
  return (
    <div className='max-w-6xl mx-auto items-start  pt-10'>
      <h3 className='px-5 font-semibold text-lg text-gray-700' id={title}>{title}</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5 mx-4'>
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