import { PRIMARY_CHAIN_ID, WPULSE } from '@pancakeswap/sdk'
import { USDC } from '@pancakeswap/tokens'
import { equalsIgnoreCase } from './equalsIgnoreCase'
import { FarmData } from './types'

/**
 * Returns the first farm with a quote token that matches from an array of preferred quote tokens
 * @param farms Array of farms
 * @param tokenAddress LP token address
 * @param preferredQuoteTokensAddress Array of preferred quote tokens
 * @returns A preferred farm, if found - or the first element of the farms array
 */
export const getFarmFromTokenAddress = (
  farms: FarmData[],
  tokenAddress: string,
  preferredQuoteTokensAddress: string[] = [USDC[PRIMARY_CHAIN_ID].address, WPULSE[PRIMARY_CHAIN_ID].address],
): FarmData => {
  const farmsWithToken = farms.filter((farm) => equalsIgnoreCase(farm.token.address, tokenAddress))
  const filteredFarm = farmsWithToken.find((farm) => {
    return preferredQuoteTokensAddress.some((quoteTokenAddress) => {
      return equalsIgnoreCase(farm.quoteToken.address, quoteTokenAddress)
    })
  })
  return filteredFarm || farmsWithToken[0]
}
