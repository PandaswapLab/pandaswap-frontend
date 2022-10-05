import { getFarmsPriceHelperLpFiles } from '@pancakeswap/farms/constants/priceHelperLps/getFarmsPriceHelperLpFiles'
import { ChainId } from '@pancakeswap/sdk'
import PoolsPulsechainTestnetPriceHelper from './pools/941'

export { getFarmsPriceHelperLpFiles }

export const getPoolsPriceHelperLpFiles = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.PULSECHAIN_TESTNET:
      return PoolsPulsechainTestnetPriceHelper
    default:
      return []
  }
}
