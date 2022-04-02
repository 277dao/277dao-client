import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export function LandingPageCarousel() {

  const [index, setIndex] = useState(0)

  const images = useMemo(() => {
      return [
          '/public/round_art/277.jpg',
          '/public/round_art/round3.jpg',
          '/public/round_art/round4.jpg',
          '/public/round_art/round5.jpg'
      ]
  }, []) 

  useEffect(() => {

    const interval = setInterval(() => {
        setIndex(index => (index+1)%images.length)
    }, 5000)

    return () => {
        clearInterval(interval)
    }

  }, [])
    
  return (
    <Container>
      <ImgContainer index={index}>
        <LandingPageRoundArtImg src={images[0]} />
        <LandingPageRoundArtImg src={images[1]} />
        <LandingPageRoundArtImg src={images[2]} />
        <LandingPageRoundArtImg src={images[3]} />
        {/* <Smaller>
          <Text>Art by</Text> <TwitterLink twitter='JannehMoe' />{' '}
        </Smaller> */}
      </ImgContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 750px;
  max-width: 80vw;
`;

const ImgContainer = styled.div<{ index: number }>`
  display: flex;
  margin-left: -${({index}) => (index ? 750*index : 0)}px;
  transition: all 1s ease-in;
`;

const LandingPageRoundArtImg = styled.img`
  width: 750px;
  max-width: 80vw;
  border-radius: 8px;
  border: 1px solid ${dfstyles.colors.borderDark};
  object-fit: cover;
`;
