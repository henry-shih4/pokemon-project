import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../resourcing/useFetch";

export default function Pokemon() {
  const { name } = useParams();
  const { data, loading } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  return (
    <>
      <div>
        {data.name ? (
          <>
            <div>{data.name}</div>
            <img src={data.sprites.front_default} />
          </>
        ) : null}
      </div>
    </>
  );
}
