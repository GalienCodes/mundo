import { ethers } from 'ethers'
import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { buyHandler, getSingleProd} from '../Blockchain.services'
import {  useGlobalState } from '../store'
import Loader from './Loader'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [product] = useGlobalState('product')

    const handlePurchase= async()=>{
      try {
        toast("Initializing product purchase ")
        await buyHandler(product?.id,
        ethers.utils.formatUnits(product.cost.toString(), 'ether'))
        toast.success("Product purchased!")
        navigate('/orders')
        } catch (error) {
        toast.error('Purchase failed.')
        console.log(error);    
      }
    }
   

    const retreiveInfo = async()=>{
      try {
        await getSingleProd(id)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      retreiveInfo()
    },[id])

  return (
    <div className='max-w-4xl mx-auto pt-24 text-gray-600 mb-10'>
        {product?.length > 0 ?(
      <div className='mx-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
          <>
            <div className='rounded'>
            <img 
            src={product?.image}
            alt={product?.name} 
            className=" h-80 sm:h-[20rem] w-full object-contain box-border border p-2 rounded-md"/>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h1 className='font-bold text-xl'>{product?.name}</h1>
              <h1 className='font-bold text-lg pb-2 text-green-400'>{ethers.utils.formatUnits(product?.cost.toString(), 'ether')} ETH</h1>
            </div>
            <div className="flex justify-between items-center pb-2">
              <h1 className='font-bold text-base'>Descriprition:</h1>
              {product.stock > 0 ? (
                <p className='bg-green-400 text-gray-50 rounded font-medium px-1.5 py-1'>In Stock</p>
              ) : (
                <p className='bg-red-400 text-gray-50 rounded font-medium px-1.5 py-1'>Out of Stock.</p>
              )}
            </div>
            <p className='text-xs text-gray-500'>{product?.description}</p>

            {product.stock > 0 ? (
              <>
              
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
              </>
            ):(<p className='py-6 text-red-400'> Sorry, we're currently out of this product</p>)}
          </div>
          </>
      </div>
     ):(<Loader/>)}
    </div>
  )
}

export default Product