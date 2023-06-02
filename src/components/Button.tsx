import React from "react";
import styled from "@emotion/styled";
import { Color } from "../constants/Color";

interface StyleCustom {
  width?: string;
  height?: string;
  margin?: string;
  background?: string;
  color?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  activeColor?: string;
  disabledColor?: string;
  disabledFontColor?: string;
  padding?: string;
  maxWidth?: string;
  borderRadius?: string;
  boxShadow?: string;
  lineHeigth?: string;
  activeFontColor?: string;
  border?: string;
  opacity?: string;
}


const ButtonWrapper = styled.button<any>`
  background: ${(props) =>
    props.styleCustom?.background ?? Color.GREY_870};
  color: ${(props) => props.styleCustom?.color ?? Color.GREY_900};
  border-radius: ${(props) => props.styleCustom?.borderRadius ?? "0.5rem"};
  border: ${(props) => props.styleCustom?.border ?? ""};
  align-items: center;
  text-align: center;
  box-shadow: ${(props) => props.styleCustom?.boxShadow ?? ""};
  width: ${(props) =>
    props.styleCustom?.width ? props.styleCustom?.width : "100%"};
  height: ${(props) =>
    props.styleCustom?.height ? props.styleCustom?.height : "3rem"};
  margin: ${(props) =>
    props.styleCustom?.margin ? props.styleCustom?.margin : "0.875rem 0 0 0"};
  display: flex;
  justify-content: center;
  opacity: ${(props) => props.styleCustom?.opacity ?? "1"};
  padding: 0px;
  fonteight: 700;

  &:hover {
    background-color: ${(props) => props.styleCustom?.hoverBackgroundColor ??  Color.GREY_900};
    color: ${(props) => props.styleCustom?.hoverColor ?? Color.WHITE} !important;
  }
  &:active {
    background-color: ${(props) => props.styleCustom?.activeColor ?? ""};
    color: ${(props) => props.styleCustom?.activeFontColor ?? ""};
  }
  &:disabled {
    background-color: ${(props) => props.styleCustom?.disabledColor ?? ""};
    color: ${(props) => props.styleCustom?.disabledFontColor ?? ""};
  }
`;


interface IProps {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  background?: boolean;
  styleCustom?: StyleCustom;
  children: React.ReactNode;
  value?: string;
}

function Button(props: IProps) {
  const {
    onClick,
    disabled = false,
    styleCustom,
    className,
    children,
    value,
  }: IProps = props;

  return (
    <ButtonWrapper
      className={className}
      type="button"
      styleCustom={styleCustom}
      onClick={onClick}
      disabled={disabled}
      color={Color.PRIMARY1}
      value={value}
    >
      {children}
    </ButtonWrapper>
  );
}

export default Button;
