import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { address } from '@darkforest_eth/serde';
import React, { useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { EmSpacer, Link, Spacer, Title } from '../Components/CoreUI';
import { EmailCTA, EmailCTAMode } from '../Components/Email';
import { Modal } from '../Components/Modal';
import { HideSmall, Sub, Text, White } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { LandingPageRoundArt } from '../Views/LandingPageRoundArt';
import { LandingPageCarousel } from '../Views/LandingPageCarousel';

import { LeadboardDisplay } from '../Views/Leaderboard';

interface Cordinate {
  x: number,
  y: number
}

export const enum LandingPageZIndex {
  Background = 0,
  Canvas = 1,
  BasePage = 2,
}

const links = {
  web: 'https://277dao.com',
  twitter: 'http://twitter.com/277dao_',
  tutorial: 'https://mirror.xyz/277share.eth',
  blog: 'https://blog.zkga.me/',
  discord: 'https://discord.gg/S9vZZrnjpt',
  github: 'https://github.com/darkforest-eth',
};

const testAddress = address('0x63a1cb5f1fab63e91bdfce289198ebc74e226762');
const officalAddress = address('0x094a1729e15f67d66a0ccc8cbf485ace4efb0f91'); // Mayday round

const StyledLink = styled.a`
  display: inline-block;
  margin: 5px 0;
  text-decoration: underline;
  :hover {
    color: ${dfstyles.colors.dfgreen};
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  --df-button-color: ${dfstyles.colors.dfgreen};
  --df-button-border: 1px solid ${dfstyles.colors.dfgreen};
  --df-button-hover-background: ${dfstyles.colors.dfgreen};
  --df-button-hover-border: 1px solid ${dfstyles.colors.dfgreen};
`;

const ButtonWrapper2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
  }

  &.button {
    display: inline-block !important;
    width: 200px !important;
    background-color: red !important;
  }

  &button {
    display: inline-block !important;
    width: 200px !important;
    background-color: red !important;
  }

  --df-button-color: ${dfstyles.colors.dfgreen};
  --df-button-border: 1px solid ${dfstyles.colors.dfgreen};
  --df-button-hover-background: ${dfstyles.colors.dfgreen};
  --df-button-hover-border: 1px solid ${dfstyles.colors.dfgreen};
`;

export default function LandingPage() {
  const history = useHistory();

  // const [timer, setTimer] = useState({
  //   canStart: false, hour: 0, min: 0, second: 0
  // })

  // useEffect(() => {
  //   const startTimer = setInterval(() => {
  //     const startDate = new Date('2022-04-30 11:00 UTC')
  //     const now = Date.now()
  //     const totalSecond = (startDate.getTime() - now)/1000
  //     setTimer({
  //       canStart: totalSecond <= 0,
  //       hour: Math.floor(totalSecond/3600),
  //       min: Math.floor(totalSecond%3600/60),
  //       second: Math.floor(totalSecond%60)
  //     })
  //   }, 1000)
  
  //   return () => {
  //     clearInterval(startTimer)
  //   }
  // }, [])

  const [coordinate, setCoordinate] = useState({
    x1: 300,
    x2: 1000,
    y: 294
  })

  useEffect(() => {
    const carousel = document.getElementById('carousel')
    if (carousel == null) {
      return
    }
    const { x, y, width } = carousel.getBoundingClientRect()
    setCoordinate({
      x1: x-300-50,
      x2: x+width+35,
      y: y
    })
    console.log(x, y, width, 'dllm')
  }, [])
  
  

  const canStart = useMemo(() => {
    const startDate = new Date('2022-04-30 11:00 UTC')
    return Date.now() - startDate.getTime() > 0
  }, [])

  function Hiring({x, y}: Cordinate) {
    return (
      <HideOnMobile>
        <Modal contain={['top', 'left', 'right']} initialX={x} initialY={y}>
          <Title slot='title'>活动预告</Title>
          <div style={{ width: '300px', maxWidth: '300px', textAlign: 'justify' }}>
            DF黑暗森林竞技场大奖赛<br />
            开始：2022年6月5日星期日 07:00 am (UTC+8）<br />
            结束：2022年6月7日星期二 07:00 pm(UTC+8)<br />
            （活动详情 请关注首页--公告）<br />
            我们“277dao第四届社区轮”比赛暂定于6月中旬举行。
          </div>
        </Modal>
      </HideOnMobile>
    );
  }
  
  function Poap({x, y}: Cordinate) {
    return (
      <HideOnMobile>
        <Modal contain={['top', 'left', 'right']} initialX={x} initialY={y}>
          <Title slot='title'>POAP & NFT</Title>
          <div style={{ width: '300px', maxWidth: '300px', textAlign: 'justify' }}>
            <StyledLink href='/poap' target='_blank'>POAP 领取地址</StyledLink>
            <br />
            <StyledLink href='https://opensea.io/277dao?tab=created' target='_blank'>NFT 展示</StyledLink>
            
          </div>
        </Modal>
      </HideOnMobile>
    );
  }

  return (
    <>
      <PrettyOverlayGradient />
      <Hiring x={coordinate.x1} y={coordinate.y}/>
      <Poap x={coordinate.x2} y={coordinate.y}/>

      <Page>
        <Spacer height={100} />

        <MainContentContainer>
          <Header>
            <ButtonWrapper2>
              <LinkButton width='120' target='_blank' href="https://blog.277dao.com/">
                公告<br/>News
              </LinkButton>
              <LinkButton width='120' target='_blank' href="https://share.277dao.com/">
                教程<br/>Tutorial
              </LinkButton>
              <LinkButton width='120' target='_blank' href="https://plugins.277dao.com/">
                插件<br/>Plugins
              </LinkButton>
              <LinkButton width='120' target='_blank' href="https://darksea.market/">
                市场<br/>Market
              </LinkButton>
            </ButtonWrapper2>
            <EmSpacer height={2} />
            <VariousLinksContainer2>
              <IconLinks>
                <a target='_blank' className={'link-web'} href={links.web}>
                  <span className={'icon-web'}></span>
                </a>
                {/* <Spacer width={8} />
                <a target='_blank' className={'link-book'} href={links.tutorial}>
                  <span className={'icon-book'}></span>
                </a> */}
                <Spacer width={8} />
                <a target='_blank' className={'link-twitter'} href={links.twitter}>
                  <span className={'icon-twitter'}></span>
                </a>
                <Spacer width={8} />
                <a target='_blank' className={'link-discord'} href={links.discord}>
                  <span className={'icon-discord'}></span>
                </a>
                {/* <Spacer width={8} /> */}
                {/* <a target='_blank' className={'link-github'} href={links.github}>
                  <span className={'icon-github'}></span>
                </a> */}
              </IconLinks>
            </VariousLinksContainer2>
            <EmSpacer height={2} />
            <div id='carousel'>
              <LandingPageCarousel />
            </div>
            <EmSpacer height={3} />

            <p>
              <White>Dark Forest</White> <Text>277Dao & dfDao Community</Text>
              <br />
              <Text>Special Round: </Text>
              <White>28/5 - 29/5</White>
            </p>

            <Spacer height={16} />

            <ButtonWrapper>
              <LinkButton disabled style={{margin: 0}} width='180' href={'#' || `https://dfgame.277dao.com/play/${testAddress}`}>
                测试服<br/>Test Round
              </LinkButton>
              {/* <LinkButton disabled={!canStart} style={{margin: 0}} width='180' href={canStart ? `https://dfgame.277dao.com/play/${officalAddress}` : 'javascript:void(0)'}> */}
              <LinkButton style={{margin: 0}} width='180' href={`https://arena.dfdao.xyz/play/0x74e744a3b0146de406dd857b9b99c6d7b8219eef`}>
                特殊轮<br/>Special Round
              </LinkButton>
            </ButtonWrapper>
          </Header>

          <EmSpacer height={3} />

          <Info>
            <HallOfFameTitle>Special Round Info</HallOfFameTitle>
            <Spacer height={8} />
            <table>
              <tbody>
                <TRow>
                  <td>游戏开始时间</td>
                  <td>2022年5月28日 12:00 (UTC+8)</td>
                </TRow>
                <TRow>
                  <td>游戏结束时间</td>
                  <td>2022年5月29日 24:00 (UTC+8)</td>
                </TRow>
                <TRow>
                  <td>Game start time</td>
                  <td>2022/05/28 12:00 (UTC+8)</td>
                </TRow>
                <TRow>
                  <td>Game end time</td>
                  <td>2022/05/29 24:00 pm (UTC+8)</td>
                </TRow>
                {/* <TRow>
                  <td>倒数</td>
                  <td>{timer.hour} 时 {timer.min} 分 {timer.second} 秒</td>
                </TRow>
                <TRow>
                  <td>CountDown</td>
                  <td>{timer.hour} hr {timer.min} min {timer.second} s</td>
                </TRow> */}
              </tbody>
            </table>
            <EmSpacer height={3} />
            <ButtonWrapper>
              {/* <Btn size='large' onClick={() => history.push(`/lobby/${defaultAddress}`)}>
                Create Lobby
              </Btn> */}
              <LinkButton target='_blank' href='https://277dao.com/wordpress/news/405/'>
                More Info
              </LinkButton>
            </ButtonWrapper>
          </Info>

          {/* <Spacer height={32} />

          <EmailWrapper>
            <EmailCTA mode={EmailCTAMode.SUBSCRIBE} />
          </EmailWrapper>

          <Spacer height={16} /> */}

          {/* <VariousLinksContainer>
            <IconLinks>
              <a target='_blank' className={'link-web'} href={links.web}>
                <span className={'icon-web'}></span>
              </a>
              <Spacer width={8} />
              <a target='_blank' className={'link-book'} href={links.tutorial}>
                <span className={'icon-book'}></span>
              </a>
              <Spacer width={8} />
              <a target='_blank' className={'link-twitter'} href={links.twitter}>
                <span className={'icon-twitter'}></span>
              </a>
              <Spacer width={8} />
              <a target='_blank' className={'link-discord'} href={links.discord}>
                <span className={'icon-discord'}></span>
              </a>
              <a target='_blank' className={'link-github'} href={links.github}>
                <span className={'icon-github'}></span>
              </a>
            </IconLinks>
          </VariousLinksContainer> */}
        </MainContentContainer>

        <Spacer height={64} />

        <LeadboardDisplay />

        <Spacer height={128} />
      </Page>
    </>
  );
}

const LinkButton = styled.a<{ width?: any, disabled?: boolean }>`
  width: ${({width}) => width || 150}px;
  padding: 10px 20px;
  border: 1px solid ${dfstyles.colors.dfgreen};
  border-radius: 5px;
  color: ${dfstyles.colors.dfgreen};
  font-size: 0.8em;
  background: ${dfstyles.colors.backgrounddark};
  margin: 0 auto;
  text-align: center;

  ${({disabled}) => !disabled && `
    &:hover {
      color: black;
      background-color: #0ab167;
    }
  `}
  opacity: ${({disabled}) => disabled? 0.5: 1};

}
`

const VariousLinksContainer = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VariousLinksContainer2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrettyOverlayGradient = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to left top, rgba(73, 10, 219, 0.2), rgba(1, 255, 1, 0.2)) fixed;
  background-position: 50%, 50%;
  display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Header = styled.div`
  text-align: center;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const TRow = styled.tr`
  & td:first-child {
    color: ${dfstyles.colors.subtext};
  }
  & td:nth-child(2) {
    padding-left: 12pt;
  }
  & td:nth-child(3) {
    text-align: right;
    padding-left: 16pt;
  }
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;


const TextLinks = styled.span`
  vertical-align: center;
  & a {
    transition: color 0.2s;

    &:hover {
      color: ${dfstyles.colors.dfblue};
    }
  }
`;

const IconLinks = styled.span`
  font-size: 18pt;

  & a {
    margin: 0 6pt;
    transition: color 0.2s;
    &:hover {
      cursor: pointer;
      &.link-web {
        color: ${dfstyles.colors.icons.web};
      }
      &.link-book {
        color: ${dfstyles.colors.icons.book};
      }
      &.link-twitter {
        color: ${dfstyles.colors.icons.twitter};
      }
      &.link-github {
        color: ${dfstyles.colors.icons.github};
      }
      &.link-discord {
        color: ${dfstyles.colors.icons.discord};
      }
      &.link-blog {
        color: ${dfstyles.colors.icons.blog};
      }
      &.link-email {
        color: ${dfstyles.colors.icons.email};
      }
    }
  }
`;

const Page = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  font-size: ${dfstyles.fontSize};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: ${LandingPageZIndex.BasePage};
`;

const HallOfFameTitle = styled.div`
  color: ${dfstyles.colors.subtext};
  display: inline-block;
  border-bottom: 1px solid ${dfstyles.colors.subtext};
  line-height: 1em;
`;

const Info = styled.div`
  color: ${dfstyles.colors.text};
  padding: 0 20px;
  overflow: scroll;
`



const HideOnMobile = styled.div`
  @media only screen and (max-device-width: 900px) {
    display: none;
  }
`;