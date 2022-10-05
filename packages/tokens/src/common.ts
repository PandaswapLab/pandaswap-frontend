import { ChainId, Token } from '@pancakeswap/sdk'

export const DEX_TOKEN_TESTNET = new Token(
  ChainId.PULSECHAIN_TESTNET,
  '0x1D700Ae6E61f31Bc1Df7Fe76Ed10e3Dadd1Cb5fe',
  18,
  'PIR',
  'Pirate Token',
  'TODO',
)

export const USDC_TESTNET = new Token(
  ChainId.PULSECHAIN_TESTNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  18,
  'USDC',
  'USD Coin',
  'https://www.centre.io/usdc',
)

export const USDT_TESTNET = new Token(
  ChainId.PULSECHAIN_TESTNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  18,
  'USDT',
  'Tether USD',
  'https://www.tether.to',
)

export const DEX_TOKEN = {
  [ChainId.PULSECHAIN_TESTNET]: DEX_TOKEN_TESTNET,
}

export const USDC = {
  [ChainId.PULSECHAIN_TESTNET]: USDC_TESTNET,
}

export const USDT = {
  [ChainId.PULSECHAIN_TESTNET]: USDT_TESTNET,
}
