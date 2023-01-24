import React from 'react'
import { useGlobalState } from '../../store'
import Loader from '../Loader'
import Section from './Section'

const Products = () => {
  const [products] = useGlobalState('products')
  const [clothing] = useGlobalState('clothing')
  const [electronics] = useGlobalState('electronics')
  const [toys] = useGlobalState('toys')
  console.log(toys);

  return (
    <div className='absolute left-0 right-0 top-[24%]'>
          <div className='max-w-4xl mx-auto  flex flex-col justify-center items-center pl-4 px-4 pb-8'>
              <h1 className='text-2xl sm:text-3xl font-black text-green-400 py-2 text-center'>Let's Shop on Mundo Market</h1>
              <p>Pay faster , get it delivered  faster!</p>
          </div>

        
         {electronics.length && clothing.length && toys.length ? (
          <>   
            <Section title={"Clothing "} items={clothing} />
            <Section title={"Electronics"} items={electronics} />
            <Section title={"Toys"} items={toys} />
          </>
          ):<Loader/>}
    </div>
  )
}

export default Products