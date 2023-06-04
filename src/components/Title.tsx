import React, { useCallback, memo } from "react";
import styled from "@emotion/styled";
import { Color } from "@/constants/Color";
import { useRouter } from "next/router";

interface IProps {
  title: string;
  description?: string;
}

const TitleContainer = styled.div`
  // padding: 0px 24px;
  display: flex;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  margin-top: 80px;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 120%;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${(props) => props.color ?? ""}
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const DescWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${(props) => props.color ?? ""}
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 16px 0px;
`;


const Title = (props: IProps) => {
  const { title, description }: IProps = props;
  const router = useRouter();

  const goMain = useCallback(() => {
    router.replace('/')
  }, [])

  return (
    <TitleContainer onClick={goMain}>
      <TitleWrapper color={Color.BLACK}>{title}</TitleWrapper>
      {description && (
        <DescWrapper color={Color.BLACK}>{description}</DescWrapper>
      )}
    </TitleContainer>
  );
};

export default memo(Title);
