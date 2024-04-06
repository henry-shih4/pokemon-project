import React from "react";
import styled from "styled-components";

const ErrorPage = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
  justify-items: center;

  h3 {
    padding: 2em;
    text-align: center;
    font-family: Roboto;
  }
`;

const Image = styled.img``;

export default function NotFound() {
  return (
    <div>
      <ErrorPage>
        <h3>Oops, that page was not found. Please try again!</h3>
        <Image src="/omanyte.png"></Image>
      </ErrorPage>
    </div>
  );
}
