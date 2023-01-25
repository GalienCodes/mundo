import React from 'react'
import { useGlobalState } from '../../store'
import Loader from '../Loader'
import Section from './Section'

const Products = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [clothing] = useGlobalState('clothing')
  const [electronics] = useGlobalState('electronics')
  const [toys] = useGlobalState('toys')

  return (
    <div className='absolute left-0 right-0 top-[24%] pb-10'>
          <div className='max-w-4xl mx-auto  flex flex-col justify-center items-center pl-4 px-4 pb-8'>
              <h1 className='text-2xl sm:text-3xl font-black text-green-400 py-2 text-center'>Let's Shop on Mundo Market</h1>
              <p>Pay faster , get it delivered  faster!</p>
          </div>
          {!connectedAccount?(
            <div className='max-w-4xl mx-auto  text-center'>
              <h1 className='font-bold text-green-400 pt-10 '>Please, Connet Your Metamask Wallet</h1>
            </div>
          ):(electronics.length && clothing.length && toys.length ? (
              <>   
                <Section title={"Clothing & Jewelry"} items={clothing} />
                <Section title={"Electronics & Gadgets"} items={electronics} />
                <Section title={"Toys & Gaming"} items={toys} />
              </>
              ):<Loader/>            
          )}
    </div>
  )
}

export default Products