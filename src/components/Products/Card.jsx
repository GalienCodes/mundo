import { ethers } from 'ethers'
import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({item}) => {
  return (
    <div>
      <div className='p-4  rounded-xl shadow-lg font-globalFont bg-white ' >
            <img className='rounded-lg h-80 sm:h-60 w-full object-cover' src={item.image} alt="NFT" />
            <div className="flex items-center justify-between">
              <h2 className='my-2  text-gray-500 font-medium'> {item.name}</h2>
              <p className='font-medium text-green-400'>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</p>
            </div>
            <Link to={`/product/${item.id}`}>
              <button className='px-6 py-3 shadow-lg bg-gray-100 text-gray-700 rounded-xl w-full'>View Details</button>
            </Link>
    </div>
    </div>
  )
}

export default Card