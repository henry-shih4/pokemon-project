import React from 'react'
import styled from "styled-components";


const ErrorPage = styled.div`
    height:100vh;
    width:100%;
    display:grid;
    place-content:center;
    justify-items:center;

    h3{
        padding:2em;
        text-align:center;
        font-family:Roboto;
    }
`

const Image = styled.img`
    
`

export default function Error() {
  return (
    <div>
        <ErrorPage>
            <h3>Oops, something went wrong. Please try again!</h3>
            <Image src ='/omanyte.png'>
            </Image>
        </ErrorPage>
    </div>
  )
}
