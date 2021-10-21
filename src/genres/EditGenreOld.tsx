import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { urlGenres } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";
import GenreForm from "./GenreForm";
import { genreCreationDTO } from "./Genres.model";

export default function EditGenreOld() {
  const { id }: any = useParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [genre, setGenre] = useState<genreCreationDTO>();
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${urlGenres}/${id}`)
      .then((response: AxiosResponse<genreCreationDTO>) => {
        setGenre(response.data);
      });
  }, [id]);

  async function edit(genreToEdit: genreCreationDTO) {
    try {
      await axios.put(`${urlGenres}/${id}`, genreToEdit);
      history.push("/genres");
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Edit Genre</h3>
      <DisplayErrors errors={errors} />
      {genre ? (
        <GenreForm
          model={genre}
          onSubmit={async (value) => {
            await edit(value);
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
