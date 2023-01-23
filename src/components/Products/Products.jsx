import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalState } from '../../store'
import Card from './Card'
import Section from './Section'
import Electronics from './Electronics.'
import Toys from './Toys'

const Products = () => {
  const [products] = useGlobalState('products')
  const [clothing] = useGlobalState('clothing')
  const [electronics] = useGlobalState('electronics')
  const [toys] = useGlobalState('toys')

  return (
    <div className='pt-10'>
        
         {electronics && clothing && toys && (
          <>   
            <Section title={"Clothing "} items={clothing} />
            <Section title={"Electronics"} items={electronics} />
            <Section title={"Toys"} items={toys} />
          </>
          )}
    </div>
  )
}

export default Products