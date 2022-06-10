import React, { useState, useMemo, useEffect } from 'react';
import { TwitterLink } from '../Components/Labels/Labels';
import { Smaller, Text } from '../Components/Text';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export function LandingPageCarousel() {

  const [index, setIndex] = useState(0)
  const [pause, setPause] = useState(false)

  const images = useMemo(() => {
    return [
      '/public/round_art/277-8.jpg',
      '/public/round_art/277.jpg',
      '/public/round_art/277-6.gif',
      
      '/public/round_art/277-8.jpg',
      '/public/round_art/277.jpg',
      '/public/round_art/277-6.gif',

      '/public/round_art/277-8.jpg',
      '/public/round_art/277.jpg',
      '/public/round_art/277-6.gif',
      // '/public/round_art/277-2.gif',
      // '/public/round_art/277-3.jpg',
    ]
  }, [])

  useEffect(() => {

    const interval = setInterval(() => {
      if (!pause) {
        setIndex(index => (index + 1) % images.length)
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }

  }, [pause])

  return (
    <>
      <Container>
        <ImgContainer index={index}>
          {
            images.map((img, index) => (
              <LandingPageRoundArtImg  key={index} src={img} 
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
              />
            ))
          }
        </ImgContainer>
      </Container>
      <TextContainer>
        <Smaller>
          <Text>Art by</Text> <TwitterLink twitter='ThunderWolf_will' />{' '}
        </Smaller>
      </TextContainer>
    </>
  );
}

const TextContainer = styled.div`
  text-align: right;
`


const Container = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 750px;
  max-width: 80vw;
  margin: 0 auto;

  @media (max-width: 900px) {
    width: 80vw;
  }
`;

const ImgContainer = styled.div<{ index: number }>`
  display: flex;
  margin-left: -${({ index }) => (index ? 750 * index : 0)}px;
  transition: all 1s ease-in;

  @media (max-width: 900px) {
    margin-left: -${({ index }) => (index ? 80 * index : 0)}vw;
  }
`;

const LandingPageRoundArtImg = styled.img`
  width: 750px;
  max-width: 80vw;
  border-radius: 8px;
  border: 1px solid ${dfstyles.colors.borderDark};
  object-fit: cover;
`;
