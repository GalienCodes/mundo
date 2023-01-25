import React from 'react'
import { AiFillLinkedin } from 'react-icons/ai';
const About = () => {
  return (
    <div className='max-w-4xl mx-auto pt-24 text-gray-600 mb-10'>
        <div className=' mx-4'>

          <div className='py-4'>
            <h2 className='text-sm text-gray-600'><span className='font-black text-3xl mr-2'>Mu</span><span className='text-green-400 font-black text-3xl mr-2'>ndo</span> is a web3 e-commerce which refers to the use of decentralized technology, specifically blockchain, in online shopping. Some benefits of using this technology include:</h2>  
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3 '>
            <div  className='text-sm rounded-lg p-4  bg-white shadow-md'>
              <h1 className='bg-green-400 text-gray-50 w-10 h-10 text-center p-2 rounded-full mb-2 text-lg font-black'>1</h1>
              <p>
                Increased security and protection of customer data: Blockchain technology allows for secure and transparent transactions without the need for a central authority.
              </p>
            </div>
            <div className='text-sm rounded-lg p-4  bg-white shadow-md'> 
            <h1 className='bg-green-400 text-gray-50 w-10 h-10 text-center p-2 rounded-full mb-2 text-lg font-black'>2</h1>
            <p>
                Lower transaction fees: Decentralized systems eliminate the need for intermediaries, which can lead to lower transaction fees for both merchants and customers.
            </p>
            </div>
            <div className='text-sm rounded-lg p-4  bg-white shadow-md'>
              <h1 className='bg-green-400 text-gray-50 w-10 h-10 text-center p-2 rounded-full mb-2 text-lg font-black'>3</h1>
              <p>
                Improved transparency and trust: Smart contracts, which are self-executing contracts with the terms of the agreement written directly into code, can provide increased 
              </p>
              transparency and trust in e-commerce transactions.
            </div>
          </div>
          <div className='flex py-2 sm:py-4 justify-center items-center text-sm '>
            <a href="https://www.linkedin.com/in/muhindo-galien/" target='_blank'>
              <h2 className='flex items-center cursor-pointer'>Deloped by: Muhindo Galien <AiFillLinkedin className='text-xl font-bold text-gray-700'/></h2>
            </a>
          </div>
        </div>
    </div>
  )
}

export default About