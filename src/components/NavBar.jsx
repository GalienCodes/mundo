import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import gblockcahin from "../assets/gblockchain.png"
import { connectWallet, disconnectWallet } from '../Blockchain.services'
import { truncate, useGlobalState } from '../store'
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import Identicon from 'react-identicons';


const NavBar = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [opened, setOpened] = useState(false)
  const handleOpened = ()=>{
    console.log("done");
    setOpened(!opened)
  }
  return (
    <div className=" sm:px-8 bg-white z-50 mx-auto w-full fixed shadow-sm">
        <div className=' flex items-center justify-between py-4 sm:mx-0 mx-4 '>
          <Link to={'/'}>
            <h1 className='font-black text-3xl'>Mu<span className='text-green-400'>ndo</span></h1>
          </Link>
          {/* tablet laptop */}
          <div className=''>
            <ul className='sm:flex justify-center gap-10 text-gray-500 hidden'>
              <Link to={'/'}>
                <li className='cursor-pointer'>Home</li>
              </Link>
              <Link to={'/about'}>
                <li className='cursor-pointer'>About</li>
              </Link>
              <Link to={'/orders'}>
                <li className='cursor-pointer'>My orders</li>
              </Link>
            </ul>
          </div>
          {/* phone */}
          <div className={opened?"block": "hidden"}>
              <ul className='fixed top-0 left-0 bottom-0 flex flex-col shadow-xl overflow-hidden  h-48 w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto'>
                <li className='cursor-pointer'>Home</li>
                <li className='cursor-pointer'>About</li>
                <li className='cursor-pointer'>My orders</li>
                
                <button className='bg-green-400 font-medium  px-3 py-2 rounded text-gray-50 my-1'onClick={()=>disconnectWallet()}> Disconnect</button>
                {connectedAccount?
                ( <button disabled type='button' className='bg-green-400 px-3 py-2 rounded text-gray-50 font-semibold'>
                      {truncate(connectedAccount,6,6,15)}
                  </button> ):(
                    <button type='button' className='bg-green-400 font-medium  px-3 py-2 rounded text-gray-50' onClick={()=>connectWallet()}>
                    Connect Wallet
                  </button> 
                  )}
              </ul>
          </div>

            <div className='flex gap-4 items-center'>
              {connectedAccount?
               (<div className='flex items-center gap-2'>
                 <button className='bg-green-400 font-medium  px-3 py-2 rounded text-gray-50 my-1'onClick={()=>disconnectWallet()}> Disconnect</button>
                 <button disabled type='button' className='hidden sm:block bg-green-400 font-medium  px-3 py-2 rounded text-gray-50 my-1'>
                    {truncate(connectedAccount,6,6,15)}
                </button>
                <Identicon
                string={connectedAccount}
                size={35}
                className="rounded-full"
                />
               </div> 
               ):(
                  <button type='button' className='bg-green-400 font-medium  px-3 py-2 rounded text-gray-50' onClick={()=>connectWallet()}>
                  Connect Wallet
                </button> 
                )
              }
              {
                opened?(
                    <div class="sm:hidden block">
                        <MdClose className='text-3xl' onClick={()=>handleOpened()}/>
                    </div>
                ):(
                <div class="sm:hidden block">
                    <HiMenuAlt3 className='text-3xl' onClick={()=>handleOpened()}/>
                </div>
                )
              }

            </div>
          </div>
        </div>
  )
}

export default NavBar