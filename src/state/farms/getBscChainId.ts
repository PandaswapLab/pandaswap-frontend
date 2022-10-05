import NoBscVaultAbi from 'config/abi/NoBscVaultAbi.json'
import { getMasterChefAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { ChainId, PRIMARY_CHAIN_ID } from '@pancakeswap/sdk'

// will return BSC or BSC Testnet chainId
export const getPulseChainId = async (chainId: number) => {
  try {
    if (!chainId) {
      return PRIMARY_CHAIN_ID
    }

    const calls = [
      {
        name: 'BSC_CHAIN_ID',
        address: getMasterChefAddress(chainId),
      },
    ]
    const [[bscChainId]] = await multicallv2({ abi: NoBscVaultAbi, calls, chainId })
    return bscChainId
  } catch (error) {
    console.error('Get BSC Chain Id Error: ', error)
    return PRIMARY_CHAIN_ID
  }
}
