import { ChainId, WPULSE } from '@pancakeswap/sdk'
import { USDC_TESTNET, DEX_TOKEN_TESTNET, USDT_TESTNET } from './common'

export const pulsechainTestnetTokens = {
  wpulse: WPULSE[ChainId.PULSECHAIN_TESTNET],
  pir: DEX_TOKEN_TESTNET,
  usdc: USDC_TESTNET,
  usdt: USDT_TESTNET,
}
