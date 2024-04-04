import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const spinAnimation = keyframes`
 0% { rotate:0deg }
 100% { rotate:360deg }
`;

const Spinner = styled.img`
  width: ${({ props }) => (props.variant === "small" ? "50px" : "140px")};
  height: ${({ props }) => (props.variant === "small" ? "50px" : "140px")};
  animation: 1s linear infinite ${spinAnimation};
`;

export default function Loading(props) {
  return <Spinner props={props} src="/pokeball.svg" />;
}
