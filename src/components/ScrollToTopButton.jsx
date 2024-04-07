import React from 'react'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ScrollButton = styled.div`
    position:fixed;
    bottom:0;
    right:0;
    padding:0.5rem;
    display:flex;
    justify-content:center;
    flex-direction:column;
`
const Image = styled.img`
  height: 60px;
`;

const Svg = styled.img`
    height:20px;
`
    function handleButtonClick() {
 window.scrollTo({
   top: 0,
   behavior: "smooth",
 });
}



export default function ScrollToTopButton() {



  return (
    <ScrollButton onClick={()=>{
        handleButtonClick()
    }}>
        <Svg src='/up.svg'/>
        <Image src='/dragonite.png'/>
    </ScrollButton>
  )
}
