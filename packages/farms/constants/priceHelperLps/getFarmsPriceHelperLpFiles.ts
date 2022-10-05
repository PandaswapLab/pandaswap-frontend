import { ChainId } from '@pancakeswap/sdk'
import FarmsTestnetPriceHelper from './941'

export const getFarmsPriceHelperLpFiles = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.PULSECHAIN_TESTNET:
      return FarmsTestnetPriceHelper
    default:
      return []
  }
}
