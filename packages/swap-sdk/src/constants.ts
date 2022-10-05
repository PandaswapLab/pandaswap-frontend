import JSBI from 'jsbi'
import { Token } from './entities/token'

// exports for external consumption
export type BigintIsh = JSBI | number | string

export enum ChainId {
  PULSECHAIN_TESTNET = 941,
}

// TODO Change it after deploy to mainent
export const PRIMARY_CHAIN_ID = ChainId.PULSECHAIN_TESTNET

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.PULSECHAIN_TESTNET]: '0x7927dbE1a75Bc0cAE56A730d7865F7dAb1A30149',
}
export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.PULSECHAIN_TESTNET]: '0x820cec090cc9c940dcb65b09342b401c451dd8f4901ae132f5249c0051fef8f0',
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _9975 = JSBI.BigInt(9975)
export const _10000 = JSBI.BigInt(10000)

export const MaxUint256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256',
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
}

export const WETH9 = {
  [ChainId.PULSECHAIN_TESTNET]: new Token(
    ChainId.PULSECHAIN_TESTNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
}

export const WPULSE = {
  [ChainId.PULSECHAIN_TESTNET]: new Token(
    ChainId.PULSECHAIN_TESTNET,
    '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7',
    18,
    'PLS',
    'Wrapped Pulse',
    'https://pulsechain.com/'
  ),
}

export const WNATIVE: Record<number, Token> = {
  [ChainId.PULSECHAIN_TESTNET]: WPULSE[ChainId.PULSECHAIN_TESTNET],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.PULSECHAIN_TESTNET]: { name: 'Pulse', symbol: 'PULSE', decimals: 18 },
}
