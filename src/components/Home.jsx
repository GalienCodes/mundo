import React from 'react'
import {  useGlobalState } from '../store'
import Banner from './Banner'
import Products from './Products/Products'
const Home = () => {

  return (
    <div className='py-10 relative '>
      <Banner/>
      <Products/>
    </div>
  )
}

export default Home