import React from "react";

export default function PokemonCard(props) {
  const { pokeInfo } = props;
  return (
    <>
      <div>{pokeInfo.name}</div>
    </>
  );
}
