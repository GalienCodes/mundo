import { ethers } from 'ethers'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { buyHandler, getEtheriumContract} from '../Blockchain.services'
import { getGlobalState, useGlobalState } from '../store'
import abi from '../abis/Mundo.json'
export const contractAddress = '0x21706208100c6B74DB4B4148A53C7cA9A4394d54'

const Product = () => {
  const { id } = useParams()
  const [contract,setContact]=useState(null)
  const [prod, setProd] = useState(null)
  const [data, setData] = useState([])
  const [clothing] = useGlobalState('clothing')
  const [electronics] = useGlobalState('electronics')
  const [toys] = useGlobalState('toys')
  const allItems = []
  const handleIteration=(allOfItems)=>{
    for (let i = 0; i < allOfItems?.length; i++) {
      allItems.push(allOfItems[i])
    }
    }
    handleIteration(toys)
    handleIteration(clothing)
    handleIteration(electronics)  
    const singleProduct =   allItems?.filter((el)=> el.id === id)
    
 
    const handlePurchase= async()=>{
      try {
        await buyHandler(singleProduct[0]?.id,
          ethers.utils.formatUnits(singleProduct[0].cost.toString(), 'ether'))
          toast.success("Initializing pruduct purchase ")
      } catch (error) {
        toast.error('Purchase failed.')
        console.log(error);

        
      }
    }
  return (
    <div className='max-w-4xl mx-auto pt-24 text-gray-600 mb-10'>
      <div className='mx-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
        <div className='rounded'>
          <img 
          src={singleProduct[0]?.image}
           alt={singleProduct[0]?.name} 
           className=" h-80 sm:h-[20rem] w-full object-cover box-border border p-2 rounded-md"/>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h1 className='font-bold text-xl'>{singleProduct[0]?.name}</h1>
            <h1 className='font-bold text-lg pb-2 text-green-400'>{ethers.utils.formatUnits(singleProduct[0]?.cost.toString(), 'ether')} ETH</h1>
          </div>
            <h1 className='font-bold text-base'>Descriprition:</h1>
          {/* <p> {singleProduct[0].}</p> */}
          <p className='text-xs text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
            <div className='py-6 text-green-400'>
              FREE delivery <br />
              <p>
                {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          <button
           className='bg-green-400 font-medium  px-3 py-2 rounded text-gray-50 my-1' 
           onClick={async()=>handlePurchase()}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product