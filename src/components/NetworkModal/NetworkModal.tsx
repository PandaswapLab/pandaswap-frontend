import { ModalV2 } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId, PRIMARY_CHAIN_ID } from '@pancakeswap/sdk'
import { useMemo } from 'react'
import { useNetwork } from 'wagmi'
import { atom, useAtom } from 'jotai'
import { SUPPORT_ONLY_MAINNET } from 'config/constants/supportChains'
import { UnsupportedNetworkModal } from './UnsupportedNetworkModal'
import { WrongNetworkModal } from './WrongNetworkModal'
import { PageNetworkSupportModal } from './PageNetworkSupportModal'

export const hideWrongNetworkModalAtom = atom(false)

export const NetworkModal = ({ pageSupportedChains = SUPPORT_ONLY_MAINNET }: { pageSupportedChains?: number[] }) => {
  const { chainId, chain, isWrongNetwork } = useActiveWeb3React()
  const { chains } = useNetwork()
  const [dismissWrongNetwork, setDismissWrongNetwork] = useAtom(hideWrongNetworkModalAtom)

  const isBNBOnlyPage = useMemo(() => {
    return pageSupportedChains?.length === 1 && pageSupportedChains[0] === PRIMARY_CHAIN_ID
  }, [pageSupportedChains])

  const isPageNotSupported = useMemo(
    () => Boolean(pageSupportedChains.length) && !pageSupportedChains.includes(chainId),
    [chainId, pageSupportedChains],
  )

  if (isPageNotSupported && isBNBOnlyPage) {
    return (
      <ModalV2 isOpen closeOnOverlayClick={false}>
        <PageNetworkSupportModal />
      </ModalV2>
    )
  }

  console.log('DUPA', chain, isPageNotSupported)
  if ((chain?.unsupported ?? false) || isPageNotSupported) {
    return (
      <ModalV2 isOpen closeOnOverlayClick={false}>
        <UnsupportedNetworkModal pageSupportedChains={pageSupportedChains} />
      </ModalV2>
    )
  }

  if (isWrongNetwork && !dismissWrongNetwork) {
    const currentChain = chains.find((c) => c.id === chainId)
    if (!currentChain) return null
    return (
      <ModalV2 isOpen={isWrongNetwork} closeOnOverlayClick onDismiss={() => setDismissWrongNetwork(true)}>
        <WrongNetworkModal currentChain={currentChain} onDismiss={() => setDismissWrongNetwork(true)} />
      </ModalV2>
    )
  }

  return null
}
