
'use client'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'
import Link from 'next/link'
import Web3ModalExample from './socialwallet/page'










const chains = [arbitrum, mainnet, polygon]
const projectId = '48a868f8d27dafa8c84b8719c13f6ae8'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})


const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App() {
  return (
       
    <>

      <div className='w-screen h-screen flex justify-center items-center bg-slate-300 flex-col'>
        <h1 className=' absolute top-0 mt-6 text-indigo-500 font-bold text-2xl '>Panaverse Dao</h1>

        <div className='m-10 flex items-center justify-center flex-col'>
          <h2 className='font-bold text-2xl  '>Account Abstraction</h2>
          <Link className='p-2 text-md m-6 bg-blue-400 text-white rounded-lg' href={'https://goerli.etherscan.io/address/0xDce00944f5439d17B877D3422A4F3B65CcF85487'} >Account Address</Link>
          
          <Link className='p-2 text-md m-6 bg-blue-400 text-white rounded-lg' href={'https://mumbai.polygonscan.com/address/0x3310E9F868693ab259791991383a0cD5c4bdF956#tokentxnsErc721'} >Minting nft</Link>
        </div>
        
         
        



        <h3 className='font-bold text-2xl '>Connect with blockchain wallet</h3>

        <div className=' mt-10 flex justify-center items-center flex-col'>
          <WagmiConfig client={wagmiClient}>
            <Web3Button />
          </WagmiConfig>

          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />



          <Link href={'/socialwallet'} className='p-2 text-md m-10 bg-blue-400 text-white rounded-lg'>Connect Social Wallet</Link>
         
        </div>
      </div>
    </>
  )
}