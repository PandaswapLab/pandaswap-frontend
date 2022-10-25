import styled from 'styled-components'
import { BodyWrapper } from './AppBody'

export const WideBodyWrapper = styled(BodyWrapper)`
  max-width: 700px;
  @media (max-width: 720px) {
    max-width: 436px;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <WideBodyWrapper>{children}</WideBodyWrapper>
}
