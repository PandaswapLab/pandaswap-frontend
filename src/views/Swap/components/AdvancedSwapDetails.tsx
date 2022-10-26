import { Trade, TradeType, Currency } from '@pancakeswap/sdk'
import { Skeleton, Text } from '@pancakeswap/uikit'
import { Field } from 'state/swap/actions'
import { useTranslation } from '@pancakeswap/localization'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/exchange'
import { AutoColumn } from 'components/Layout/Column'
import QuestionHelper from 'components/QuestionHelper'
import { TOTAL_FEE, LP_HOLDERS_FEE, TREASURY_FEE, BUYBACK_FEE } from 'config/constants/info'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
import TradePrice from './TradePrice'

function TradeSummary({
  trade,
  allowedSlippage,
  showInverted,
  setShowInverted,
}: {
  trade: Trade<Currency, Currency, TradeType>
  allowedSlippage: number
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}) {
  const { t } = useTranslation()
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  const totalFeePercent = `${(TOTAL_FEE * 100).toFixed(2)}%`
  const lpHoldersFeePercent = `${(LP_HOLDERS_FEE * 100).toFixed(2)}%`
  const treasuryFeePercent = `${(TREASURY_FEE * 100).toFixed(4)}%`
  const buyBackFeePercent = `${(BUYBACK_FEE * 100).toFixed(4)}%`

  return (
    <AutoColumn style={{ padding: '0 16px' }}>
      <RowBetween align="center">
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {t('Price')}
          </Text>
        </RowFixed>
        <RowFixed>
          <TradePrice price={trade?.executionPrice} showInverted={showInverted} setShowInverted={setShowInverted} />
        </RowFixed>
      </RowBetween>
      <RowBetween align="center">
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {t('Slippage Tolerance')}
          </Text>
        </RowFixed>
        <RowFixed>
          <Text fontSize="14px">{allowedSlippage / 100}%</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {isExactIn ? t('Minimum received') : t('Maximum sold')}
          </Text>
          <QuestionHelper
            text={t(
              'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
            )}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <RowFixed>
          <Text fontSize="14px">
            {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ?? '-'}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {t('Price Impact')}
          </Text>
          <QuestionHelper
            text={t('The difference between the market price and estimated price due to trade size.')}
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <Text fontSize="14px" color="textSubtle">
            {t('Liquidity Provider Fee')}
          </Text>
          <QuestionHelper
            text={
              <>
                <Text mb="12px">{t('For each trade a %amount% fee is paid', { amount: totalFeePercent })}</Text>
                <Text>- {t('%amount% to LP token holders', { amount: lpHoldersFeePercent })}</Text>
                <Text>- {t('%amount% to the Treasury', { amount: treasuryFeePercent })}</Text>
                <Text>- {t('%amount% towards CAKE buyback and burn', { amount: buyBackFeePercent })}</Text>
              </>
            }
            ml="4px"
            placement="top-start"
          />
        </RowFixed>
        <Text fontSize="14px">
          {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
        </Text>
      </RowBetween>
    </AutoColumn>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade<Currency, Currency, TradeType>
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export function AdvancedSwapDetails({ trade, ...other }: AdvancedSwapDetailsProps) {
  const { t } = useTranslation()
  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap="0px">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} {...other} />
          {showRoute && (
            <>
              <RowBetween style={{ padding: '0 16px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Text fontSize="14px" color="textSubtle">
                    {t('Route')}
                  </Text>
                  <QuestionHelper
                    text={t('Routing through these tokens resulted in the best price for your trade.')}
                    ml="4px"
                    placement="top-start"
                  />
                </span>
                <SwapRoute trade={trade} />
              </RowBetween>
            </>
          )}
        </>
      )}
    </AutoColumn>
  )
}
