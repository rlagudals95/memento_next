import React from "react";
import styled from "@emotion/styled";
import Carousel from 'react-material-ui-carousel'

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const SimpleSlider = (props: IProps) => {
  const { children } = props;

  const Container = styled.div`
    margin: auto 8px;
  `

  return (
    <Container>
      {/* @TODO - IndicatorIcon 흥미롭게 */}
      <Carousel 
        navButtonsAlwaysVisible={false}
        fullHeightHover={true} 
        strictIndexing={true}
        navButtonsAlwaysInvisible={false} 
        height={'700px'} autoPlay={false} 
        swipe={true} 
        animation={'slide'}
      >
        {children}
      </Carousel>
    </Container>

  );
};

export default SimpleSlider;
