import styled from 'styled-components'
import { Box, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import Footer from 'components/Menu/Footer'
import { PageMeta } from 'components/Layout/Page'
import { EXCHANGE_DOCS_URLS } from 'config/constants'
import SocialLinks from '@pancakeswap/uikit/src/components/Footer/Components/SocialLinks'

const StyledPage = styled.div<{ $removePadding: boolean; $noMinHeight }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ $removePadding }) => ($removePadding ? '0' : '32px')};
  padding-bottom: 48px;
  min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 64px)')};
  background: ${({ theme }) => theme.colors.gradientBubblegum};

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '24px')};
    padding-bottom: 72px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '32px')};
    padding-bottom: 48px;
    padding-top: 72px;
    min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 56px)')};
  }
`

const MobileStyledSocialLinks = styled(SocialLinks)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 64px;
`

const DesktopStyledSocialLinks = styled(SocialLinks)`
  position: absolute;
  right: 16px;
  bottom: 16px;
`

const Page: React.FC<
  React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & {
      removePadding?: boolean
      hideFooterOnDesktop?: boolean
      noMinHeight?: boolean
      helpUrl?: string
    }
  >
> = ({
  children,
  removePadding = false,
  hideFooterOnDesktop = false,
  noMinHeight = false,
  helpUrl = EXCHANGE_DOCS_URLS,
  ...props
}) => {
  const { isMobile } = useMatchBreakpoints()
  return (
    <>
      <PageMeta />
      <StyledPage $removePadding={removePadding} $noMinHeight={noMinHeight} {...props}>
        {children}
        <Flex flexGrow={1} />
        <Box display={hideFooterOnDesktop ? 'none' : 'block'} width="100%">
          <Footer helpUrl={helpUrl} />
        </Box>

        {isMobile ? <MobileStyledSocialLinks /> : <DesktopStyledSocialLinks />}
      </StyledPage>
    </>
  )
}

export default Page
