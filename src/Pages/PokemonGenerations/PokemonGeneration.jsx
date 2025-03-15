import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useMemo, useCallback } from "react";
import { PokemonContext } from "../../components/PokemonContext";
import Loading from "../../components/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ErrorPage from '../../components/ErrorPage'

const Container = styled.div`
  padding: var(--spacing-xl);
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
`;

const Form = styled.div`
  margin: 2em auto;
  max-width: 300px;
  display: flex;
  justify-content: center;
`;

const Select = styled.select`
  width: 100%;
  text-align: center;
  background-color: var(--surface);
  border: 2px solid var(--border);
  padding: var(--spacing-md);
  font-size: 1rem;
  border-radius: var(--radius-md);
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary);
  }

  &:focus {
    border-color: var(--primary);
    box-shadow: var(--shadow-sm);
  }
`;

const Option = styled.option`
  text-align: center;
`;

const Pokemon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--primary);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: var(--spacing-sm);
  
  span {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-primary);
  text-transform: capitalize;
  margin-bottom: var(--spacing-xs);
`;

const TypeBadge = styled.div`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: white;
  background-color: ${props => props.color};
  margin: 0 4px;
`;

const TypeContainer = styled.div`
  margin-top: var(--spacing-sm);
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
`;

const Sprite = styled(LazyLoadImage)`
  width: 150px;
  height: 150px;
  image-rendering: pixelated;
  transition: transform 0.3s ease;

  ${Pokemon}:hover & {
    transform: scale(1.1);
  }
`;

const LoadingScreen = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
`;

export default function PokemonType() {
  const { generationNumber = 1 } = useParams();
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

  const pokeData = useMemo(() => {
    generation();
    let pokemon = pokeList;
    return pokemon;
  }, [pokeList, start, end, generation]);

  return (
    <>
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
                navigate(`/generation/${e.target.value}`);
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
          {generationNumber > 9 ? <ErrorPage /> :
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
                        <Name>{item.name}</Name>
                        <span>#{item.id.toString().padStart(3, '0')}</span>
                      </Title>
                      <Sprite
                        width={150}
                        height={150}
                        src={item.sprites.front_default}
                        placeholderSrc={"/pokeball.svg"}
                        effect="opacity"
                      />
                      {/* <TypeContainer>
                        {item.types.map((type, index) => (
                          <TypeBadge
                            key={index}
                            color={typeMap[type.type.name]?.color || '#999'}
                          >
                            {type.type.name}
                          </TypeBadge>
                        ))}
                      </TypeContainer> */}
                    </Pokemon>
                  );
                })
              : null}
          </Container>
}
        </>
      )}
    </>
  );
}
