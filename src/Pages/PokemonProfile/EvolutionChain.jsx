import React, {useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";


const Container = styled.div`
  font-family: "Roboto", sans-serif;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
`;
const Evolutions = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const Evolution = styled.div`
  
  display: flex;
  flex-direction:column;
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

const NoEvolutions = styled.h3`
display:flex;
justify-content:center`

const EvoInfo = styled.div`
  display:flex;
  flex-direction:column;
`
const AltForm = styled.div`
  display:flex; 
  gap:14px;
`

export default function EvolutionChain(props) {
  const navigate = useNavigate();
  const { evolutions, allEvolutions, speciesLoading, speciesError, altForms } =
    props;

useEffect(()=>{
  console.log(altForms)
},[altForms])
  
  return (
    <>
      <Container>
        <Heading>Evolution Chain</Heading>
        {speciesLoading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          /* <Evolutions>
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
                          <div>
                            {firstEvo.trigger ? firstEvo.trigger : null}
                          </div>
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
          </Evolutions> */

          <Evolutions>
            {evolutions
              ? evolutions.map((evolution, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      <Evolution>
                        <EvoInfo>
                          <div>
                            {allEvolutions[idx]
                              ? allEvolutions[idx].level
                              : null}
                          </div>
                          <div>
                            {allEvolutions[idx]?.item
                              ? allEvolutions[idx].item.name
                              : null}
                          </div>
                          <div>
                            {allEvolutions[idx]?.trigger
                              ? allEvolutions[idx].trigger
                              : null}
                          </div>
                          <div>
                            {allEvolutions[idx]?.special
                              ? allEvolutions[idx].special
                              : null}
                          </div>
                        </EvoInfo>
                        <img
                          src={evolutions[idx].sprites.front_default}
                          onClick={() => {
                            navigate(`/pokemon/${evolutions[idx].id}`);
                          }}
                        />
                      </Evolution>
                    </React.Fragment>
                  );
                })
              : null}
          </Evolutions>
        )}
        <div>Other forms</div>
        <AltForm>
          {altForms
            ? altForms.map((item) => {
                return (
                  <div key={item.name}>
                    <img
                      src={item.sprites.front_default}
                      onClick={() => {
                        navigate(`/pokemon/${item.id}`);
                      }}
                    />
                    <p>{item.name}</p>
                  </div>
                );
              })
            : null}
        </AltForm>
        {!speciesLoading && evolutions === null ? (
          <NoEvolutions>No known evolutions</NoEvolutions>
        ) : null}
        {speciesError ? (
          <Error>
            Something went wrong! That Pokemon may not exist in our database.
          </Error>
        ) : null}
      </Container>
    </>
  );
}



                        /* <div>
                          <div>
                            {allEvolutions[idx]
                              ? allEvolutions[idx].level
                              : null}
                          </div>
                          <div>
                            {allEvolutions[idx]?.item
                              ? allEvolutions[idx].item.name
                              : null}
                          </div>
                          <div>
                            {allEvolutions[idx]?.trigger
                              ? allEvolutions[idx].trigger
                              : null}
                          </div>
                        </div> */