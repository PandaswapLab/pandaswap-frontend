import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { ChainId } from '@pancakeswap/sdk'

export const provider = {
  [ChainId.PULSECHAIN_TESTNET]: new StaticJsonRpcProvider(
    {
      url: 'https://rpc.v2b.testnet.pulsechain.com',
      skipFetchSetup: true,
    },
    941,
  ),
}
