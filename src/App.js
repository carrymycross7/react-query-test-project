import React from "react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "https://swapi-graphql.netlify.app/.netlify/functions/index";
const FILMS_QUERY = gql`
  query Query {
  allFilms {
    films {
      title
      director
      releaseDate
      speciesConnection {
        species {
          name
          classification
          homeworld {
            name
          }
        }
      }
    }
  }
}
`;

export default function App() {
  const { data, isLoading, error } = useQuery("launches", () => {
    return request(endpoint, FILMS_QUERY);
  });

  console.dir(data); 

  if (isLoading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
      <div>
        <h1>SpaceX Launches</h1>
        <ul>
        </ul>
      </div>
  );
}