import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import { DEX_TOKEN } from '@pancakeswap/tokens'
import { FAST_INTERVAL } from 'config/constants'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'
import { PRIMARY_CHAIN_ID } from '@pancakeswap/sdk'
import { useMemo } from 'react'
import useSWR from 'swr'
import { BIG_ZERO } from 'utils/bigNumber'
import { mainnetRpcProvider } from 'utils/providers'
import { useTokenContract } from './useContract'
import { useSWRContract } from './useSWRContract'

const useTokenBalance = (tokenAddress: string, forceMainnet?: boolean) => {
  const { account } = useWeb3React()

  const contract = useTokenContract(tokenAddress, false)

  const key = useMemo(
    () =>
      account
        ? {
            contract: forceMainnet ? contract.connect(mainnetRpcProvider) : contract,
            methodName: 'balanceOf',
            params: [account],
          }
        : null,
    [account, contract, forceMainnet],
  )

  const { data, status, ...rest } = useSWRContract(key as any, {
    refreshInterval: FAST_INTERVAL,
  })

  return {
    ...rest,
    fetchStatus: status,
    balance: data ? new BigNumber(data.toString()) : BIG_ZERO,
  }
}

export const useGetBnbBalance = () => {
  const { account } = useWeb3React()
  const { status, data, mutate } = useSWR([account, 'bnbBalance'], async () => {
    return mainnetRpcProvider.getBalance(account)
  })

  return { balance: data || Zero, fetchStatus: status, refresh: mutate }
}

export const useGetDexTokenBalance = () => {
  const { chainId } = useWeb3React()
  const { balance, fetchStatus } = useTokenBalance(
    DEX_TOKEN[chainId]?.address || DEX_TOKEN[PRIMARY_CHAIN_ID]?.address,
    true,
  )

  console.log('DUPA10', balance, fetchStatus, DEX_TOKEN[chainId]?.address || DEX_TOKEN[PRIMARY_CHAIN_ID]?.address)

  // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
  return { balance: EthersBigNumber.from(balance.toString()), fetchStatus }
}

export default useTokenBalance
