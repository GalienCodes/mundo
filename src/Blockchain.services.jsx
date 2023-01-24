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
      console.log(ethereum.disabled());  
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
      console.log(contract);
      return contract
  } else {
    return getGlobalState('contract')
  }
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
  const hasBought =getGlobalState('hasBought')
  const contract = await getEtheriumContract()
  cost = window.web3.utils.toWei(cost.toString(), 'ether')
  const buyer = getGlobalState('connectedAccount')
   await contract.methods.buy(id).send({ from: buyer,value: cost})
  toast.success("Product bought!")
  setGlobalState('hasBought',true)
}
// get orders

  const fetchDetails = async (item) => {
    const contract = await getEtheriumContract()
    const account = getGlobalState('connectedAccount')

    const events = await contract.queryFilter("Buy")

    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() == item.id.toString()
    )

    if (orders.length === 0) return

    const order = await contract.orders(account, orders[0].args.orderId)
    console.log(order);
  }

const getSingleProduct= async (id) => {
  try {
    const products = getGlobalState('products')
    return products.find((product) => product.id == id)
  } catch (error) {
    reportError(error)
  }
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
  buyHandler ,
  fetchDetails,
  
  getSingleProduct
  
}