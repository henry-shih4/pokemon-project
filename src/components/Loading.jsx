import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const spinAnimation = keyframes`
 0% { rotate:0deg }
 100% { rotate:360deg }
`;

const Spinner = styled.img`
  animation: 1s linear infinite ${spinAnimation};
`;

export default function Loading() {
  return (
    <div>
      <Spinner src="/pokeball.svg" />
    </div>
  );
}
