import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { urlGenres } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import GenreForm from "./GenreForm";
import { genreCreationDTO } from "./Genres.model";

export default function CreateGenre() {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(genres: genreCreationDTO) {
    try {
      await axios.post(urlGenres, genres);
      history.push("/genres");
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Create Genre</h3>
      <DisplayErrors errors={errors} />
      <GenreForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      />
    </>
  );
}
