import { ethers } from 'ethers';
import React from 'react'
import { useGlobalState } from '../store';
import moment from 'moment'
import Loader from './Loader';

const OderCard = ({myorders}) => {
  const data = myorders;
  console.log("data",data);
  return (
    <>
    {null?<Loader/>:(
      myorders.map((item,i)=>{
        return (
          <div key={i}>
            <div className="flex gap-4 bg-white shadow-md rounded-md p-2 text-gray-500 w-full">
              <img src={item[1].image} alt={item[1].name} className='w-24 h-24 rounded'/>
              <div className="flex flex-col">
                <div className='flex flex-row justify-between items-center realive'>
                  <h2 className='font-bold text-sm text-gray-500'>{item[1].name}</h2>
                  <p className='ml-4 rounded-full bg-green-400 w-6 h-6 text-center m-1 text-white font-bold'> {i+1}</p>
                </div>
                <p className='font-black text-green-400'>{ethers.utils.formatUnits(item[1].cost, 'ether')} ETH</p>
             { moment(Number(item[0] + '000')).fromNow()}
              </div>
            </div>
          </div>
        )
      }))
    }
    </>
  )
}

export default OderCard