import { CurrencyAmount, Currency, TradeType } from '@pancakeswap/sdk'
import { StableTrade, useEstimatedAmount, useStableTradeResponse } from './useStableTradeExactIn'
import { StableFarm } from '../types'

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export default function useStableTradeExactOut(
  currencyIn?: Currency,
  currencyAmountOut?: CurrencyAmount<Currency>,
  stableFarm?: StableFarm,
): StableTrade | null {
  const currencyAmountOutQuotient = currencyAmountOut?.quotient?.toString()

  const { data: currencyAmountIn } = useEstimatedAmount({
    estimatedCurrency: currencyIn,
    quotient: currencyAmountOutQuotient,
    stableFarm,
  })

  return useStableTradeResponse({
    currencyAmountIn,
    currencyAmountOut,
    stableFarm,
    tradeType: TradeType.EXACT_OUTPUT,
  })
}
