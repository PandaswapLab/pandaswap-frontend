import { useState, useCallback, useMemo, useEffect } from 'react'
import { useIsTransactionPending } from 'state/transactions/hooks'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { updateUserBalance } from 'state/pools'
import { Native, PRIMARY_CHAIN_ID } from '@pancakeswap/sdk'
import { DEX_TOKEN } from '@pancakeswap/tokens'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import { useTradeExactOut } from 'hooks/Trades'
import { useSwapCallback } from 'hooks/useSwapCallback'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useSwapCallArguments } from 'hooks/useSwapCallArguments'
import { INITIAL_ALLOWED_SLIPPAGE } from 'config/constants'
import { ENABLE_EXTEND_LOCK_AMOUNT } from '../../../helpers'

export const useExtendEnable = () => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingEnableTx, setPendingEnableTx] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string>()
  const isTransactionPending = useIsTransactionPending(transactionHash)
  const swapAmount = useMemo(() => getFullDisplayBalance(ENABLE_EXTEND_LOCK_AMOUNT), [])

  const parsedAmount = tryParseAmount(swapAmount, DEX_TOKEN[chainId])

  const trade = useTradeExactOut(Native.onChain(PRIMARY_CHAIN_ID), parsedAmount)

  const swapCalls = useSwapCallArguments(trade, INITIAL_ALLOWED_SLIPPAGE, null)

  const { callback: swapCallback } = useSwapCallback(trade, INITIAL_ALLOWED_SLIPPAGE, null, swapCalls)

  useEffect(() => {
    if (pendingEnableTx && transactionHash && !isTransactionPending) {
      dispatch(updateUserBalance({ sousId: 0, account }))
      setPendingEnableTx(isTransactionPending)
    }
  }, [account, dispatch, transactionHash, pendingEnableTx, isTransactionPending])

  const handleEnable = useCallback(() => {
    if (!swapCallback) {
      return
    }
    setPendingEnableTx(true)
    swapCallback()
      .then((hash) => {
        setTransactionHash(hash)
      })
      .catch(() => {
        setPendingEnableTx(false)
      })
  }, [swapCallback])

  return { handleEnable, pendingEnableTx }
}
