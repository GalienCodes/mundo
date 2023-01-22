import React from 'react'
import { Link } from 'react-router-dom'
import gblockcahin from "../assets/gblockchain.png"
import { connectWallet } from '../Blockchain.services'
import { truncate, useGlobalState } from '../store'
const NavBar = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <div className=" sm:px-8 bg-[#000] z-50 mx-auto w-full fixed shadow-lg">
        <div className=' flex items-center justify-between py-4 sm:mx-0 mx-4 '>
          {/* <Link to={'/'}> */}
            <img src={gblockcahin} width={50} height={50} alt="logo" className='rounded'/> 
          {/* </Link> */}
            <div className='flex gap-4'>

              <div className="rounded-full shadow-md">
              </div>
              {connectedAccount?
               ( <button disabled type='button' className='bg-[#fd1c1c]  px-3 py-2 rounded text-gray-50 font-semibold'>
                    {truncate(connectedAccount,6,6,15)}
                </button> ):(
                  <button type='button' className='bg-[#fd1c1c] font-medium  px-3 py-2 rounded text-gray-50' onClick={()=>connectWallet()}>
                  Connect Wallet
                </button> 
                )
              }

            </div>
          </div>
        </div>
  )
}

export default NavBar