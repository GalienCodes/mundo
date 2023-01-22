
import { getGlobalState, setGlobalState } from './store'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import abi from './abis/Mundo.json'

export const contractAddress = '0x769136C89Fd25aC60380cAa58b010E8C53c8B6Cb'
const contractABI = abi.abi

const { ethereum } = window


const connectWallet = async () => {
  try {
    
    if (!ethereum) return toast.error("Please install Metamask")
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
  } catch (error) {
    reportError(error)
  }
}

const isWallectConnected = async () => {
  // try {
  //   if (!ethereum) return toast.error("Please install Metamask")
  //   const accounts = await ethereum.request({ method: 'eth_accounts' })
  //   setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
  
  //   window.ethereum.on('chainChanged', (chainId) => {
  //     window.location.reload()
  //   })

    // window.ethereum.on('accountsChanged', async () => {
    //   setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    //   // await isWallectConnected()
    // })
console.log('hello');

    // if (accounts.length) {
    //   setGlobalState('connectedAccount', accounts[0]?.toLowerCase())

    // } else {
    //   toast.error('Please connect wallet.')
    //   console.log('No accounts found.')
    // }
  // } catch (error) {
  //   reportError(error)
  // }
}


const reportError = (error) => {
  console.log(error.message)
  throw new Error('No ethereum object.')
}

export {
  connectWallet,
  isWallectConnected,
}