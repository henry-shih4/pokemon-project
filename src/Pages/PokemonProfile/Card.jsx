import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  items-align: center;
  gap: 2rem;
`;
const Sprite = styled.img`
  height: 200px;
  width: 200px;

  image-rendering: pixelated;
`;

const Title = styled.h1`
  display: flex;
  gap: 1rem;
  align-text: center;
  text-transform: capitalize;
`;

const Stats = styled.div`
  display: flex;

  gap: 1rem;
`;

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;j
  justify-content:center;
  align-items:center;
  gap: 1rem;
  width:100%;
`;

const StatName = styled.div`
  display: flex;
  justify-content: start;
  gap: 1rem;
  align-items: center;
  width: 140px;
`;

const Bar = styled.div`
  width: 300px;
  height: 10px;
  display: flex;
  border-radius: 10px;
`;

export default function Card(props) {
  const { name, img, id, stats, types, abilities } = props;
  return (
    <Container>
      <Title>
        <div>{name}</div>
        <div>#{id}</div>
      </Title>
      <Info>
        <Sprite src={img} />
        <div>
          <div>Type</div>
          <div>{types[0].type.name}</div>
          {types[1] ? <div>{types[1].type.name}</div> : null}
        </div>
        <div>
          <div>Abilities</div>
          {abilities
            ? abilities.map((item) => {
                return (
                  <div key={item.ability.name}>
                    {item.ability.name}
                    {item.is_hidden == true ? <>hidden</> : null}
                  </div>
                );
              })
            : null}
        </div>
      </Info>
      <StatContainer>
        {stats
          ? stats.map((stat, idx) => {
              return (
                <React.Fragment key={idx}>
                  <Stats>
                    <StatName>
                      <div>{stat.stat.name} </div>
                      <div>{stat.base_stat}</div>
                    </StatName>

                    <Bar>
                      <div
                        style={{
                          backgroundColor: "blue",
                          width: `${stat.base_stat * 1.8}px`,
                          borderRadius: "10px",
                        }}
                      ></div>
                    </Bar>
                  </Stats>
                </React.Fragment>
              );
            })
          : null}
      </StatContainer>
    </Container>
  );
}
