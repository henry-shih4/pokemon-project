import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { PokemonContext } from "../../components/PokemonContext";
import DownArrow from "../../icons/down-arrow.svg";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EvoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Evolutions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Evolution = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    text-transform: capitalize;
    margin: 6px;
  }
`;

const SplitEvolutions = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 4rem;
  margin-top: 20px;
  @media (max-width: 900px) {
    justify-content: start;

    overflow-x: scroll;
    max-width: 550px;
  }

  @media (max-width: 600px) {
    max-width: 350px;
  }
`;

const DoubleEvolutions = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const Line = styled.div`
  border: 1px solid gray;
`;

const Location = styled.div`
  text-transform: capitalize;
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

const AltForm = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h4 {
    text-transform: capitalize;
    text-align: center;
  }
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Artwork = styled.img`
  height: 120px;
  width: 120px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
`;
const EvoInfo = styled.div`
  gap: 2px;
  padding-bottom: 20px;
`;

const LoadingScreen = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;

export default function EvolutionChain(props) {
  const navigate = useNavigate();
  const {
    evolutions,
    allEvolutions,
    speciesLoading,
    speciesError,
    altForms,
    evoLoading,
  } = props;
  const { loading } = useContext(PokemonContext);

  useEffect(() => {
    console.log(allEvolutions);
    console.log(evolutions);
  }, [evolutions]);

  return (
    <>
      {evoLoading ? (
        <LoadingScreen>
          <Loading variant="small" />
        </LoadingScreen>
      ) : (
        <Container>
          <Heading>Evolution Chain</Heading>
          {evolutions && allEvolutions ? (
            <EvoContainer>
              <Evolutions>
                {evolutions
                  ? evolutions.map((evolution, idx) => {
                      if (
                        allEvolutions[idx] &&
                        allEvolutions[idx].splitEvo == false
                      ) {
                        return (
                          <Evolution key={idx}>
                            <div>
                              <Arrow>
                                {idx != 0 ? (
                                  <img src={DownArrow} alt="down-arrow-svg" />
                                ) : null}
                              </Arrow>
                              <div>
                                <EvoInfo>
                                  {allEvolutions[idx].special
                                    ? allEvolutions[idx].special.map(
                                        (item, i) => {
                                          return (
                                            <div key={i}>
                                              <p>
                                                {item.min_level ? (
                                                  <span>
                                                    Level {item.min_level}{" "}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.held_item ? (
                                                  <span>
                                                    holding{" "}
                                                    {item.held_item.name}{" "}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.trigger &&
                                                item.trigger.name ==
                                                  "level-up" ? (
                                                  <span> Level up </span>
                                                ) : item.trigger.name ==
                                                  "trade" ? (
                                                  <span> By trade</span>
                                                ) : item.trigger.name ==
                                                  "other" ? (
                                                  <span>other</span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.item ? (
                                                  <span>
                                                    {" "}
                                                    use {item.item.name}{" "}
                                                  </span>
                                                ) : null}
                                              </p>

                                              {item.location ? (
                                                <Location>
                                                  at{" "}
                                                  {item.location.name
                                                    .split("-")
                                                    .join(" ")}
                                                </Location>
                                              ) : null}

                                              <p>
                                                {item.time_of_day ? (
                                                  <span>
                                                    {item.time_of_day} time
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.min_beauty ? (
                                                  <span>
                                                    Beauty {item.min_beauty}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.min_affection ? (
                                                  <span>
                                                    Affection{" "}
                                                    {item.min_affection}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.min_happiness ? (
                                                  <span>
                                                    Happiness{" "}
                                                    {item.min_happiness}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.needs_overworld_rain ? (
                                                  <span>when raining</span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.known_move_type ? (
                                                  <span>
                                                    knows{" "}
                                                    {item.known_move_type.name}{" "}
                                                    move
                                                  </span>
                                                ) : null}
                                              </p>
                                              {item.relative_physical_stats ? (
                                                <div>
                                                  {item.relative_physical_stats ==
                                                  -1 ? (
                                                    <p>atk {">"} def</p>
                                                  ) : item.relative_physical_stats ==
                                                    1 ? (
                                                    <p>def{">"}atk</p>
                                                  ) : item.relative_physical_stats ==
                                                    0 ? (
                                                    <p>def=atk</p>
                                                  ) : null}
                                                </div>
                                              ) : null}
                                              <Line></Line>
                                            </div>
                                          );
                                        }
                                      )
                                    : null}
                                </EvoInfo>

                                {/* {allEvolutions[idx].special.gender?
                            <div>
                              {allEvolutions[idx].special.gender == "1"
                                ? "female"
                                : allEvolutions[idx].special.gender == "2"
                                ? "male"
                                : null}
                            </div>
                            :null} */}
                              </div>
                            </div>

                            {evolutions[idx] && evolutions[idx].sprites ? (
                              <>
                                <Artwork
                                  src={
                                    evolutions[idx].sprites.other[
                                      "official-artwork"
                                    ]["front_default"]
                                  }
                                  onClick={() => {
                                    navigate(`/pokemon/${evolutions[idx].id}`);
                                    window.scrollTo(0, 0);
                                  }}
                                />
                                <h4>
                                  {evolution.name ? evolution.name : null}
                                </h4>
                              </>
                            ) : null}
                          </Evolution>
                        );
                      }
                    })
                  : null}
              </Evolutions>

              <SplitEvolutions>
                {evolutions
                  ? evolutions.map((evolution, idx) => {
                      if (
                        allEvolutions[idx] &&
                        allEvolutions[idx].splitEvo == true &&
                        !allEvolutions[idx].doubleEvo
                      ) {
                        return (
                          <Evolution key={idx}>
                            <div>
                              <Arrow>
                                {idx != 0 ? (
                                  <img src={DownArrow} alt="down-arrow-svg" />
                                ) : null}
                              </Arrow>
                              <div>
                                <EvoInfo>
                                  {allEvolutions[idx].special
                                    ? allEvolutions[idx].special.map(
                                        (item, i) => {
                                          return (
                                            <div key={i}>
                                              <p>
                                                {item.min_level ? (
                                                  <span>
                                                    Level {item.min_level}{" "}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.held_item ? (
                                                  <span>
                                                    holding{" "}
                                                    {item.held_item.name}{" "}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.trigger &&
                                                item.trigger.name ==
                                                  "level-up" ? (
                                                  <span> Level up </span>
                                                ) : item.trigger.name ==
                                                  "trade" ? (
                                                  <span> By trade</span>
                                                ) : item.trigger.name ==
                                                  "other" ? (
                                                  <span>other</span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.item ? (
                                                  <span>
                                                    {" "}
                                                    use {item.item.name}{" "}
                                                  </span>
                                                ) : null}
                                              </p>

                                              {item.location ? (
                                                <Location>
                                                  at{" "}
                                                  {item.location.name
                                                    .split("-")
                                                    .join(" ")}
                                                </Location>
                                              ) : null}

                                              <p>
                                                {item.time_of_day ? (
                                                  <span>
                                                    {item.time_of_day} time
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.min_beauty ? (
                                                  <span>
                                                    Beauty {item.min_beauty}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.min_affection ? (
                                                  <span>
                                                    Affection{" "}
                                                    {item.min_affection}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.min_happiness ? (
                                                  <span>
                                                    Happiness{" "}
                                                    {item.min_happiness}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.needs_overworld_rain ? (
                                                  <span>when raining</span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.known_move_type ? (
                                                  <span>
                                                    knows{" "}
                                                    {item.known_move_type.name}{" "}
                                                    move
                                                  </span>
                                                ) : null}
                                              </p>
                                              {item.relative_physical_stats ? (
                                                <div>
                                                  {item.relative_physical_stats ==
                                                  -1 ? (
                                                    <p>atk {">"} def</p>
                                                  ) : item.relative_physical_stats ==
                                                    1 ? (
                                                    <p>def{">"}atk</p>
                                                  ) : item.relative_physical_stats ==
                                                    0 ? (
                                                    <p>def{"="}atk</p>
                                                  ) : null}
                                                </div>
                                              ) : null}
                                              <Line></Line>
                                            </div>
                                          );
                                        }
                                      )
                                    : null}
                                </EvoInfo>

                                {/* {allEvolutions[idx].special.gender?
                            <div>
                              {allEvolutions[idx].special.gender == "1"
                                ? "female"
                                : allEvolutions[idx].special.gender == "2"
                                ? "male"
                                : null}
                            </div>
                            :null} */}
                              </div>
                            </div>

                            {evolutions[idx] && evolutions[idx].sprites ? (
                              <>
                                <Artwork
                                  src={
                                    evolutions[idx].sprites.other[
                                      "official-artwork"
                                    ]["front_default"]
                                  }
                                  onClick={() => {
                                    navigate(`/pokemon/${evolutions[idx].id}`);
                                    window.scrollTo(0, 0);
                                  }}
                                />
                                <h4>
                                  {evolution.name ? evolution.name : null}
                                </h4>
                              </>
                            ) : null}
                          </Evolution>
                        );
                      }
                    })
                  : null}
              </SplitEvolutions>
              <DoubleEvolutions>
                {evolutions
                  ? evolutions.map((evolution, idx) => {
                      if (
                        allEvolutions[idx] &&
                        allEvolutions[idx].doubleEvo == true
                      ) {
                        return (
                          <Evolution key={idx}>
                            <div>
                              <Arrow>
                                {idx != 0 ? (
                                  <img src={DownArrow} alt="down-arrow-svg" />
                                ) : null}
                              </Arrow>
                              <div>
                                <div>
                                  {allEvolutions[idx].special
                                    ? allEvolutions[idx].special.map(
                                        (item, i) => {
                                          return (
                                            <div key={i}>
                                              <p>
                                                {item.min_level ? (
                                                  <span>
                                                    Level {item.min_level}{" "}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.held_item ? (
                                                  <span>
                                                    holding{" "}
                                                    {item.held_item.name}{" "}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.trigger &&
                                                item.trigger.name ==
                                                  "level-up" ? (
                                                  <span> Level up </span>
                                                ) : item.trigger.name ==
                                                  "trade" ? (
                                                  <span> By trade</span>
                                                ) : item.trigger.name ==
                                                  "other" ? (
                                                  <span>other</span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.item ? (
                                                  <span>
                                                    {" "}
                                                    use {item.item.name}{" "}
                                                  </span>
                                                ) : null}
                                              </p>

                                              {item.location ? (
                                                <Location>
                                                  at{" "}
                                                  {item.location.name
                                                    .split("-")
                                                    .join(" ")}
                                                </Location>
                                              ) : null}

                                              <p>
                                                {item.time_of_day ? (
                                                  <span>
                                                    {item.time_of_day} time
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.min_beauty ? (
                                                  <span>
                                                    Beauty {item.min_beauty}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.min_affection ? (
                                                  <span>
                                                    Affection{" "}
                                                    {item.min_affection}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.min_happiness ? (
                                                  <span>
                                                    Happiness{" "}
                                                    {item.min_happiness}
                                                  </span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.needs_overworld_rain ? (
                                                  <span>when raining</span>
                                                ) : null}
                                              </p>
                                              <p>
                                                {item.known_move_type ? (
                                                  <span>
                                                    knows{" "}
                                                    {item.known_move_type.name}{" "}
                                                    move
                                                  </span>
                                                ) : null}
                                              </p>
                                              {item.relative_physical_stats ? (
                                                <div>
                                                  {item.relative_physical_stats ==
                                                  -1 ? (
                                                    <p>atk {">"} def</p>
                                                  ) : item.relative_physical_stats ==
                                                    1 ? (
                                                    <p>def{">"}atk</p>
                                                  ) : item.relative_physical_stats ==
                                                    0 ? (
                                                    <p>def=atk</p>
                                                  ) : null}
                                                </div>
                                              ) : null}
                                              <Line></Line>
                                            </div>
                                          );
                                        }
                                      )
                                    : null}
                                </div>

                                {/* {allEvolutions[idx].special.gender?
                            <div>
                              {allEvolutions[idx].special.gender == "1"
                                ? "female"
                                : allEvolutions[idx].special.gender == "2"
                                ? "male"
                                : null}
                            </div>
                            :null} */}
                              </div>
                            </div>

                            {evolutions[idx] && evolutions[idx].sprites ? (
                              <>
                                <Artwork
                                  src={
                                    evolutions[idx].sprites.other[
                                      "official-artwork"
                                    ]["front_default"]
                                  }
                                  onClick={() => {
                                    navigate(`/pokemon/${evolutions[idx].id}`);
                                  }}
                                />
                                <h4>
                                  {evolution.name ? evolution.name : null}
                                </h4>
                              </>
                            ) : null}
                          </Evolution>
                        );
                      }
                    })
                  : null}
              </DoubleEvolutions>
            </EvoContainer>
          ) : null}
          <Container>
            <h3>Alternate Forms</h3>
            <AltForm>
              {altForms
                ? altForms.map((item) => {
                    return (
                      <div key={item.name}>
                        <Artwork
                          src={
                            item.sprites.other["official-artwork"][
                              "front_default"
                            ]
                          }
                          onClick={() => {
                            navigate(`/pokemon/${item.id}`);
                            window.scrollTo(0, 0);
                          }}
                        />
                        <h4>{item.name.split("-").join(" ")}</h4>
                      </div>
                    );
                  })
                : null}
            </AltForm>
          </Container>
          {speciesError ? (
            <Error>
              Something went wrong! That Pokemon may not exist in our database.
            </Error>
          ) : null}
        </Container>
      )}
    </>
  );
}
