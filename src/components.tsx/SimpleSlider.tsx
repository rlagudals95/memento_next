import React, { useRef, useState } from "react";
import styled from "@emotion/styled";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const SimpleSlider = (props: IProps) => {
  const { children } = props;

  const Container = styled.div`
    width: 100%;
    height: 100%;
  `

  const CardWrapper = styled.div`
    margin: auto;
    width: 100%;
    height: 100%;
  `

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number>();

  const onDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    console.log('drag start !!')
    setIsDrag(true);
    setStartX(e.pageX + (scrollRef.current?.scrollLeft || 0));
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current!;

      if (startX !== undefined) {
        scrollRef.current!.scrollLeft = startX - e.pageX;

        if (scrollLeft === 0) {
          setStartX(e.pageX);
        } else if (scrollWidth <= clientWidth + scrollLeft) {
          setStartX(e.pageX + scrollLeft);
        }
      }
    }
  };

  const throttle = (func: (...args: any[]) => void, ms: number) => {
    let throttled = false;
    return (...args: any[]) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const delay = 50;
  const onThrottleDragMove = throttle(onDragMove, delay);

  return (
    <Container
      className="card-wrap"
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : undefined}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollRef}
    >
      <CardWrapper className="card-wrap" ref={scrollRef}>
        {children}
      </CardWrapper>
    </Container>
  );
};

export default SimpleSlider;
