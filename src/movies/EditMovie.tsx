import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { urlMovies } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertMovieToFormData } from "../utils/formDataUtils";
import Loading from "../utils/Loading";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviePutGetDTO } from "./movies.model";

export default function EditMovie() {
  const { id }: any = useParams();
  const [model, setModel] = useState<movieCreationDTO>();
  const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${urlMovies}/PutGet/${id}`)
      .then((response: AxiosResponse<moviePutGetDTO>) => {
        const model: movieCreationDTO = {
          title: response.data.movie.title,
          inTheaters: response.data.movie.inTheaters,
          trailer: response.data.movie.trailer,
          posterURL: response.data.movie.poster,
          summary: response.data.movie.summary,
          releaseDate: new Date(response.data.movie.releaseDate),
        };
        setModel(model);
        setMoviePutGet(response.data);
      });
  }, [id]);

  async function edit(movieToEdit: movieCreationDTO) {
    try {
      const formData = convertMovieToFormData(movieToEdit);
      await axios({
        method: "put",
        url: `${urlMovies}/${id}`,
        data: formData,
        headers: { "content-type": "multipart/form-data" },
      });
      history.push(`/movie/${id}`);
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Edit Movie</h3>
      <DisplayErrors errors={errors} />
      {model && moviePutGet ? (
        <MovieForm
          model={model}
          onSubmit={async (values) => await edit(values)}
          nonSelectedGenres={moviePutGet.nonSelectedGenres}
          selectedGenres={moviePutGet.selectedGenres}
          nonSelectedMovieTheaters={moviePutGet.nonSelectedMovieTheaters}
          selectedMovieTheaters={moviePutGet.selectedMovieTheaters}
          selectedActors={moviePutGet.actors}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
