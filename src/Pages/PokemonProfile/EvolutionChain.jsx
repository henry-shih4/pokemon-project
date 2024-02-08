import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { PokemonContext } from "../../components/PokemonContext";

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
  const { evolutions, allEvolutions, speciesLoading, speciesError, altForms, evoLoading } =
    props;
  const { loading } = useContext(PokemonContext);



useEffect(()=>{
  console.log(evolutions)
  console.log(allEvolutions)
  console.log(altForms)
},[altForms])
  
  return (
    <>
      {evoLoading || loading ? <Loading /> :
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
                  /* return (
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

                         
                        </EvoInfo>
                        {evolutions[idx]?
                        <img
                          src={evolutions[idx].sprites.front_default}
                          onClick={() => {
                            navigate(`/pokemon/${evolutions[idx].id}`);
                          }}
                        />
                        :null}
                      </Evolution>
                    </React.Fragment>
                  ); */
                  return (
                    <div>
                      <div>
                        {allEvolutions[idx].special.min_level ? (
                          <p>level {allEvolutions[idx].special.min_level} </p>
                        ) : null}
                      </div>
                      {allEvolutions[idx].special.relative_physical_stats == -1
                        ? "def>atk"
                        : allEvolutions[idx].special.relative_physical_stats ==
                          1
                        ? "atk>def"
                        : null}
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
                        {allEvolutions[idx].special.time_of_day == "day"
                          ? "day time"
                          : allEvolutions[idx].special.time_of_day == "night"
                          ? "night time"
                          : null}
                      </div>
                      <div>
                        {allEvolutions[idx].special.min_happiness ? (
                          <p>
                            happiness {allEvolutions[idx].special.min_happiness}
                          </p>
                        ) : null}
                        <div>
                          {allEvolutions[idx].special.location
                            ? allEvolutions[idx].special.location.name
                            : null}
                        </div>
                      </div>
                      <div>
                        {allEvolutions[idx].special.min_beauty ? (
                          <p>beauty {allEvolutions[idx].special.min_beauty}</p>
                        ) : null}
                        <div>
                          {allEvolutions[idx].special.location
                            ? allEvolutions[idx].special.location.name
                            : null}
                        </div>
                        <div>
                          {allEvolutions[idx].special.min_happiness ? (
                            <p>
                              happiness{" "}
                              {allEvolutions[idx].special.min_happiness}
                            </p>
                          ) : null}
                          <div>
                            {allEvolutions[idx].special.location
                              ? allEvolutions[idx].special.location.name
                              : null}
                          </div>
                          <div>
                            {allEvolutions[idx].special.gender == "1"
                              ? "female"
                              : allEvolutions[idx].special.gender == "2"
                              ? "male"
                              : null}
                          </div>
                        </div>
                      </div>
                      {evolutions[idx] ? (
                        <img
                          src={evolutions[idx].sprites.front_default}
                          onClick={() => {
                            navigate(`/pokemon/${evolutions[idx].id}`);
                          }}
                        />
                      ) : null}
                    </div>
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
        }
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

                                /* {allEvolutions? allEvolutions.map((item,idx)=>{
          return (
          <div key={idx}>
          {item.special.min_level}
          </div>
          )
        }) :null} */