import Web3 from 'web3'
import { getGlobalState, setGlobalState } from './store'
import { toast } from 'react-hot-toast'
import abi from './abis/Mundo.json'

export const contractAddress = '0x769136C89Fd25aC60380cAa58b010E8C53c8B6Cb'
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

const structuredProduct = (products) => {
  return products
    .map((product) => ({
      id: product.id,
      price: window.web3.utils.fromWei(product.price),
      name: product.name,
      category: product.category,
      image: product.image,
      stock: product.stock,
    }))
}

const reportError = (error) => {
  console.log(error.message)
  throw new Error('No ethereum object.')
}

export {
  connectWallet,
  getEtheriumContract,
  isWallectConnected,
  listProduct
  
}