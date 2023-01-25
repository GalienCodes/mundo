import React from 'react'
import { toast } from 'react-hot-toast';
import { withdrawFunds } from '../Blockchain.services';
import { useGlobalState } from '../store';

const Admin = () => {
  const adminAddress = '0x8a45643ABC0a981FAadaAd72aE6d3b22A0AEa81e'
  const [connectedAccount] = useGlobalState('connectedAccount')
  const handleWithdrawing= async(e)=>{
    e.preventDefault()
    try {
      toast("Withdrawing ")
      await withdrawFunds()
      toast.success("Funds withdrawn!")
      } catch (error) {
      toast.error(error)
      console.log(error);    
    }
  }
  return (
    <>
      {
        adminAddress.toLocaleLowerCase() === connectedAccount?
        (<div className='max-w-xl mx-auto h-30 p-4 rounded-md bg-green-400  border pt-10 '>
          <h2 className='text-2xl text-center font-bold text-gray-50'>Admin Box</h2>
          <h2 className='text-lg text-left font-bold text-gray-50'>Mundo Balance: </h2>
          <button className='py-2 px-3 bg-white  w-full rounded' onClick={()=>handleWithdrawing}> Withdraw</button>
        </div>):(null)
      }
    </>
  )
}

export default Admin