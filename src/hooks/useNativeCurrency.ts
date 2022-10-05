import { Native, NativeCurrency, PRIMARY_CHAIN_ID } from '@pancakeswap/sdk'
import { useMemo } from 'react'
import useActiveWeb3React from './useActiveWeb3React'

export default function useNativeCurrency(): NativeCurrency {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    try {
      return Native.onChain(chainId)
    } catch (e) {
      return Native.onChain(PRIMARY_CHAIN_ID)
    }
  }, [chainId])
}
