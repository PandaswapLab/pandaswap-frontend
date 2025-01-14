import { Token, Pair, PRIMARY_CHAIN_ID } from '@pancakeswap/sdk'
import { isAddress } from 'utils'

const getLpAddress = (token1: string | Token, token2: string | Token, chainId: number = PRIMARY_CHAIN_ID) => {
  let token1AsTokenInstance = token1
  let token2AsTokenInstance = token2
  if (!token1 || !token2) {
    return null
  }
  if (typeof token1 === 'string' || token1 instanceof String) {
    const checksummedToken1Address = isAddress(token1)
    if (!checksummedToken1Address) {
      return null
    }
    token1AsTokenInstance = new Token(chainId, checksummedToken1Address, 18, 'Cake-LP')
  }
  if (typeof token2 === 'string' || token2 instanceof String) {
    const checksummedToken2Address = isAddress(token2)
    if (!checksummedToken2Address) {
      return null
    }
    token2AsTokenInstance = new Token(chainId, checksummedToken2Address, 18, 'Cake-LP')
  }
  return Pair.getAddress(token1AsTokenInstance as Token, token2AsTokenInstance as Token)
}

export default getLpAddress
