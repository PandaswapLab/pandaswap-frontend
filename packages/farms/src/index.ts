import { formatEther } from '@ethersproject/units'
import { MultiCallV2 } from '@pancakeswap/multicall'
import { ChainId, PRIMARY_CHAIN_ID } from '@pancakeswap/sdk'
import { masterChefAddresses } from './const'
import type { FarmWithPrices } from './farmPrices'
import { farmV2FetchFarms, FetchFarmsParams, fetchMasterChefV2Data } from './fetchFarms'

const supportedChainId = [ChainId.PULSECHAIN_TESTNET]
export const bCakeSupportedChainId = [ChainId.PULSECHAIN_TESTNET]

export function createFarmFetcher(multicallv2: MultiCallV2) {
  const fetchFarms = async (
    params: {
      isTestnet: boolean
    } & Pick<FetchFarmsParams, 'chainId' | 'farms'>,
  ) => {
    const { isTestnet, farms, chainId } = params
    const masterChefAddress = isTestnet
      ? masterChefAddresses[ChainId.PULSECHAIN_TESTNET]
      : masterChefAddresses[PRIMARY_CHAIN_ID]
    const { poolLength, totalRegularAllocPoint, totalSpecialAllocPoint, cakePerBlock } = await fetchMasterChefV2Data({
      isTestnet,
      multicallv2,
      masterChefAddress,
    })
    const regularCakePerBlock = formatEther(cakePerBlock)
    const farmsWithPrice = await farmV2FetchFarms({
      multicallv2,
      masterChefAddress,
      isTestnet,
      chainId,
      farms: farms.filter((f) => !f.pid || poolLength.gt(f.pid)),
      totalRegularAllocPoint,
      totalSpecialAllocPoint,
    })

    return {
      farmsWithPrice,
      poolLength: poolLength.toNumber(),
      regularCakePerBlock: +regularCakePerBlock,
    }
  }
  return {
    fetchFarms,
    isChainSupported: (chainId: number) => supportedChainId.includes(chainId),
    supportedChainId,
    isTestnet: (chainId: number) => chainId === ChainId.PULSECHAIN_TESTNET,
  }
}

export * from './apr'
export * from './farmsPriceHelpers'
export * from './types'
export type { FarmWithPrices }
