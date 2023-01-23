import React from 'react'
import { useGlobalState } from '../../store'
import Card from './Card'

const Section = ({ title, items }) => {
  return (
    <div className='max-w-4xl mx-auto items-start self-center'>
      <h3 className='mx-5 font-semibold text-lg text-gray-700 text-center md:text-left ' id={title}>{title}</h3>
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