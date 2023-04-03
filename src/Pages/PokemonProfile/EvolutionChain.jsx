import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Evolutions = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const Evolution = styled.div`
  display: flex;
  align-items: center;
`;
const Heading = styled.h2`
  display: flex;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Error = styled.h3`
  display: flex;
  justify-content: center;
`;

export default function EvolutionChain(props) {
  const navigate = useNavigate();
  const { evolutions, firstEvo, secondEvo, speciesLoading, speciesError } =
    props;

    
  return (
    <>
      <Heading>Evolution Chain</Heading>
      {speciesLoading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <Evolutions>
          {evolutions ? (
            <>
              <div>
                {evolutions[0] ? (
                  <>
                    <Evolution>
                      <img
                        src={evolutions[0].sprites.front_default}
                        onClick={() => {
                          navigate(`/pokemon/${evolutions[0].name}`);
                        }}
                      />
                      <div>
                        <div>{firstEvo.level ? firstEvo.level : null}</div>
                        <div>{firstEvo.item ? firstEvo.item : null}</div>
                        <div>{firstEvo.trigger ? firstEvo.trigger : null}</div>
                      </div>
                    </Evolution>
                  </>
                ) : (
                  <Loading />
                )}
              </div>
              <div>
                {evolutions[1] ? (
                  <>
                    <Evolution>
                      <img
                        src={evolutions[1].sprites.front_default}
                        onClick={() => {
                          navigate(`/pokemon/${evolutions[1].name}`);
                        }}
                      />
                      <div>
                        <div>{secondEvo.level ? secondEvo.level : null}</div>
                        <div>{secondEvo.item ? secondEvo.item : null}</div>
                        <div>
                          {secondEvo.trigger ? secondEvo.trigger : null}
                        </div>
                      </div>
                    </Evolution>
                  </>
                ) : null}
              </div>

              <div>
                {evolutions[2] ? (
                  <img
                    src={evolutions[2].sprites.front_default}
                    onClick={() => {
                      navigate(`/pokemon/${evolutions[2].name}`);
                    }}
                  />
                ) : null}
              </div>
            </>
          ) : null}
        </Evolutions>
      )}
      {!speciesLoading && evolutions === null ? "No known evolution" : null}
      {speciesError ? <Error>Something went wrong!</Error> : null}
    </>
  );
}
