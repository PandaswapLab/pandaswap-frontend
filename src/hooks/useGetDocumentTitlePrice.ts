import { useEffect } from 'react'
import { useMainTokenUsdPrice } from 'hooks/useBUSDPrice'

const useGetDocumentTitlePrice = () => {
  const cakePriceBusd = useMainTokenUsdPrice()
  useEffect(() => {
    const cakePriceBusdString = cakePriceBusd ? cakePriceBusd.toFixed(2) : ''
    document.title = `Pancake Swap - ${cakePriceBusdString}`
  }, [cakePriceBusd])
}
export default useGetDocumentTitlePrice
