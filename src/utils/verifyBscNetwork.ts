import { ChainId, PRIMARY_CHAIN_ID } from '@pancakeswap/sdk'

export const verifyPulseNetwork = (chainId: number) => {
  return chainId === ChainId.PULSECHAIN_TESTNET || chainId === PRIMARY_CHAIN_ID
}
