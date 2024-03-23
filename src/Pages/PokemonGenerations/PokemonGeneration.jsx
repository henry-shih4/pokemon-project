import React from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { PokemonContext } from "../../components/PokemonContext";
import Loading from "../../components/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Navigation from "../../components/Navigation";


const Container = styled.div`
font-family:Roboto;
  background-color: #ffffff;
  display: grid;
  width: 90%;
  min-width:375px;
  margin: auto;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap:10px;
  justify-items:center;
`;

const ButtonLink = styled(NavLink)`
  font-family: Roboto;
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #fff;
  background-color: #ee1515;
  margin: 1em;
`;

const Form = styled.div`
  margin: 2em;
  display: flex;
  justify-content: center;
`;
const Select = styled.select`
  text-align:center;
  display:flex;
  justify-content:center;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.7);
  }
`;

const Option = styled.option`
text-align:center;
`

const Pokemon = styled.div`
min-width:250px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  justify-content: center;
  align-items: center;
  &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  
`;

const Title = styled.div`
  text-align: center;
  text-transform: capitalize;
  font-size: 20px;
  span {
    font-weight: bold;
    font-size: 14px;
    padding-left: 8px;
  }
`;

const Sprite = styled(LazyLoadImage)`
  image-rendering: pixelated;
`;

const LoadingScreen = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;

export default function PokemonType() {
  const [generationNumber, setGenerationNumber] = useState("1");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const { pokeList, loading } = useContext(PokemonContext);
  const navigate = useNavigate();

  const generation = useCallback(() => {
    if (generationNumber === "1") {
      setStart(0);
      setEnd(151);
    }
    if (generationNumber === "2") {
      setStart(151);
      setEnd(251);
    }
    if (generationNumber === "3") {
      setStart(251);
      setEnd(386);
    }
    if (generationNumber === "4") {
      setStart(386);
      setEnd(493);
    }
    if (generationNumber === "5") {
      setStart(493);
      setEnd(649);
    }
    if (generationNumber === "6") {
      setStart(649);
      setEnd(721);
    }
    if (generationNumber === "7") {
      setStart(721);
      setEnd(809);
    }
    if (generationNumber === "8") {
      setStart(809);
      setEnd(905);
    }
    if (generationNumber === "9") {
      setStart(905);
      setEnd(1010);
    }
  }, [generationNumber]);


  useEffect(()=>{
    console.log(generationNumber)
  }, [generationNumber])
  const pokeData = useMemo(() => {
    let data = sessionStorage.getItem("generation");
    if (data){
      setGenerationNumber(data)
    }
    generation();
    let pokemon = pokeList;
    return pokemon;
  }, [pokeList, start, end, generation]);


    // useEffect(()=>{
    //   console.log(pokeList)
    // },[pokeList])

  return (
    <>
      <Navigation/>
      {loading ? (
        <LoadingScreen>
          <Loading />
        </LoadingScreen>
      ) : (
        <>
          <Form>
            <Select
            defaultValue={generationNumber}
              onChange={(e) => {
                setGenerationNumber(e.target.value);
                sessionStorage.setItem("generation", e.target.value);
              }}
            >
              <Option value={1}>Generation 1</Option>
              <Option value={2}>Generation 2</Option>
              <Option value={3}>Generation 3</Option>
              <Option value={4}>Generation 4</Option>
              <Option value={5}>Generation 5</Option>
              <Option value={6}>Generation 6</Option>
              <Option value={7}>Generation 7</Option>
              <Option value={8}>Generation 8</Option>
              <Option value={9}>Generation 9</Option>
            </Select>
          </Form>
          <Container>
            {pokeData
              ? pokeData.slice(start, end).map((item) => {
                  return (
                    <Pokemon
                      key={item.id}
                      onClick={() => {
                        navigate(`/pokemon/${item.id}`, {
                          state: { item },
                        });
                      }}
                    >
                      <Title>
                        {item.name} <span>#{item.id}</span>
                      </Title>
                      <Sprite
                        width={120}
                        height={120}
                        src={item.sprites.front_default}
                        placeholderSrc={"/pokeball.svg"}
                      />
                    </Pokemon>
                  );
                })
              : null}
          </Container>
        </>
      )}
    </>
  );
}
