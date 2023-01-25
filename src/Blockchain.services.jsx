import Web3 from 'web3'
import { ethers } from 'ethers'
import { getGlobalState, setGlobalState, useGlobalState } from './store'
import { toast } from 'react-hot-toast'
import abi from './abis/Mundo.json'
export const contractAddress = '0x21706208100c6B74DB4B4148A53C7cA9A4394d54'
const contractABI = abi.abi

const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)


const connectWallet = async () => {
  try {
    if (!ethereum) return toast.error('Please install Metamask', 'red')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    window.location.reload()
  } catch (error) {
    console.log(error.message)
  }
}

const disconnectWallet = async () => {
  const connectedAccount = getGlobalState('connectedAccount')
  try {
    if(connectedAccount){
      setGlobalState('connectedAccount','')
      window.location.reload()
    }
  } catch (error) {
    console.log(error.message)
  }
}


const isWallectConnected = async () => {
  try {
    if (!ethereum) return toast.error('Please install Metamask', 'red')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    } else {
      toast.error('Please install Metamask')
     
      setGlobalState('connectedAccount','')

    }
  } catch (error) {
    reportError(error)
  }
}

const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const web3 = window.web3
      const contract = new web3.eth.Contract(abi.abi, contractAddress)
      setGlobalState('contract',await contract)
      return contract
  } else {
    return getGlobalState('contract')
  }
}

const getSingleProd =async(id)=>{

  const contract = await getEtheriumContract()
  const singleProd =await contract.methods.getItem(id).call()
  setGlobalState('product',singleProd)
}

const fetchOrders = async () => {
  const connectedAccount = getGlobalState('connectedAccount')
  const contract = await getEtheriumContract()
  const allOrders = []
  const orderNumber = await contract.methods.orderCount(connectedAccount).call()
  for(let i = 0; i < orderNumber; i++){
      const order = await contract.methods.orders(connectedAccount,i+1).call()
      allOrders.push(order)
  }
  setGlobalState('myorders',allOrders.reverse())
  return allOrders
}

const listProduct = async()=>{
  if (!ethereum) return alert('Please install Metamask')
  const contract = await getEtheriumContract()
  const products = []
  for (var i = 0; i < 9; i++) {
    const item =  await contract.methods.items(i+1).call()
    products.push(item)
    setGlobalState('products',item)
  }

  const electronics = products.filter((item) => item.category === 'electronics')
  const clothing = products.filter((item) => item.category === 'clothing')
  const toys = products.filter((item) => item.category === 'toys')
  setGlobalState('electronics',(electronics))
  setGlobalState('clothing',clothing)
  setGlobalState('toys',toys)
}

const buyHandler = async (id,cost) => {
  const contract = await getEtheriumContract()
  cost = window.web3.utils.toWei(cost.toString(), 'ether')
  const buyer = getGlobalState('connectedAccount')
  await contract.methods.buy(id).send({ from: buyer,value: cost})
  }
  
  const withdrawFunds = async()=>{
    const web3 = window.web3
    const contract = await getEtheriumContract();
    const balance =web3.eth.getBalance( '0x21706208100c6B74DB4B4148A53C7cA9A4394d54');
    console.log(balance);

    await contract.methods.withdraw().call()

  }
const reportError = (error) => {
  console.log(error.message)
  throw new Error('No ethereum object.')
}

export {
  connectWallet,
  getEtheriumContract,
  isWallectConnected,
  listProduct,
  disconnectWallet,
  buyHandler,
  getSingleProd,
  fetchOrders,
  withdrawFunds
}