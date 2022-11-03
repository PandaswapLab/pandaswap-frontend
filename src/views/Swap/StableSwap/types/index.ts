import { SerializedStableFarmConfig } from '@pancakeswap/farms'
import { Token } from '../../../../../packages/swap-sdk/src/entities'

export type StableFarm = SerializedStableFarmConfig & {
  liquidityToken: Token
  token0: Token
  token1: Token
}
