import React from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';

function PoapPage() {
  return (
    <Container>
        <h1>POAP 领取地址</h1>
        <StyledLink href='https://poap.delivery/277dao-s1r1' target='_blank'>第一届POAP</StyledLink>
        <br/>
        <StyledLink href='https://poap.delivery/277dao-s1r2' target='_blank'>第二届POAP</StyledLink>
        <br/>
        <StyledLink href='https://poap.delivery/277dao-s1r3' target='_blank'>第三届POAP</StyledLink>
        <br/>
        <StyledLink href='https://poap.delivery/277dao-mayday-s' target='_blank'>5.1特殊轮POAP</StyledLink>
        <br/>
    </Container>
  )
}

export default PoapPage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    h1 {
        font-size: 3em;
        margin-bottom: 50px;
    }
`

const StyledLink = styled.a`
  display: inline-block;
  margin: 5px 0;
  text-decoration: underline;
  font-size: 2em;
  :hover {
    color: ${dfstyles.colors.dfgreen};
  }
`