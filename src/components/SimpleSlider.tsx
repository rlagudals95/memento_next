import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Carousel from 'react-material-ui-carousel'

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const SimpleSlider = (props: IProps) => {
  const { children } = props;
  const [isLast, setIsLast] = useState(false);

  const Container = styled.div`
    margin: auto 8px;
  `

  const handleNext = useCallback((now?: number, next?: number) => {
    const isLastSection = children && typeof children === "object" && Array.from(children).length === now + 1;

    if (isLastSection) {
      setIsLast(true);
    }
  }, [])

  return (
    <Container> 
      {/* @TODO - IndicatorIcon 흥미롭게 */}
      <Carousel navButtonsAlwaysVisible={false} fullHeightHover={true} cycleNavigation={false} navButtonsAlwaysInvisible={false} height={'700px'} autoPlay={false} swipe={true} animation={'slide'}>
        {children}
      </Carousel>
    </Container>

  );
};

export default SimpleSlider;
