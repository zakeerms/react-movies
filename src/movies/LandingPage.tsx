import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { urlMovies } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import { landingPageDTO } from "./movies.model";
import MoviesList from "./MoviesList";

export default function LandingPage() {
  //Used for delayed loading page
  const [movies, setMovies] = useState<landingPageDTO>({});
  useEffect(() => {
    loadDate();
  }, []);
  function loadDate() {
    axios.get(urlMovies).then((response: AxiosResponse<landingPageDTO>) => {
      setMovies(response.data);
    });
  }
  return (
    <AlertContext.Provider
      value={() => {
        loadDate();
      }}
    >
      <h3>In Theaters</h3>
      <MoviesList movies={movies.inTheaters} />
      <h3>Upcoming Releases</h3>
      <MoviesList movies={movies.upcomingReleases} />
    </AlertContext.Provider>
  );
}
