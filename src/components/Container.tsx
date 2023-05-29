import React, { memo } from "react";
import styled from "@emotion/styled";


interface IProps {
  children: React.ReactNode;
}

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  padding: 0 8px;
`

const Container = (props: IProps) => {

  const { children }: IProps = props;

  return (<ContainerWrapper>{children}</ContainerWrapper>)
}

export default memo(Container);