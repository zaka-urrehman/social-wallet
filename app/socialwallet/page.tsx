'use client'
import { web3ModalConfig } from '@zerodevapp/wagmi/web3modal'
import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'


import { WagmiConfig } from 'wagmi'
// import { polygonMumbai } from 'wagmi/dist/chains'

import { 
  SocialWalletConnector,
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from '@zerodevapp/wagmi'

import {
  EthereumClient,
  w3mConnectors,
 w3mProvider,
} from "@web3modal/ethereum";

import { Web3Modal, Web3Button } from "@web3modal/react";
import { polygon, polygonMumbai } from 'wagmi/dist/chains';





export default function Web3ModalExample() {
    const defaultProjectId ="5f513a35-8b67-4e98-a8ef-9ff15328b54c"
    const defaultWalletConenctProjectId ="48a868f8d27dafa8c84b8719c13f6ae8"
    const { chains, provider, webSocketProvider } = configureChains(
        [mainnet, ...(process.env.NODE_ENV === 'production' ? [goerli] : [])],
        [
          publicProvider(),
        ],
      )
      
    const client = createClient({
      autoConnect: false,
      connectors: [
        new SocialWalletConnector({options: {
          projectId: defaultProjectId,
        }}),
        new GoogleSocialWalletConnector({options: {
          projectId: defaultProjectId,
        }}),
        ...w3mConnectors({
          projectId: defaultWalletConenctProjectId,
          version: 2,
          
          chains,
        }),
      ],
      provider,
      webSocketProvider,
    })
  
    const ethereumClient = new EthereumClient(client, chains);
  
    return (
      <>
        <WagmiConfig client={client}>
          <Web3Button />
        </WagmiConfig>
        <Web3Modal
            {...web3ModalConfig}
            projectId={defaultWalletConenctProjectId}
            ethereumClient={ethereumClient}
        />
      </>
    )
  }