import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import * as Yup from "yup";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import { movieCreationDTO } from "./movies.model";
import CheckBoxField from "../forms/CheckBoxField";
import MultipleSelector, {
  multipleSelectorModel,
} from "../forms/MultipleSelector";
import { useState } from "react";
import { genreDTO } from "../genres/Genres.model";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
import TypeAheadActors from "../forms/TypeAheadActors";
import { actorMovieDTO } from "../actors/actord.model";
import MarkDownField from "../forms/MarkDownField";

export default function MovieForm(props: movieFormProps) {
  const [selectedGenres, setSelectedGenres] = useState(
    mapToModel(props.selectedGenres)
  );
  const [nonSelectedGenres, setNonSelectedGenres] = useState(
    mapToModel(props.nonSelectedGenres)
  );

  const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(
    mapToModel(props.selectedMovieTheaters)
  );
  const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState(
    mapToModel(props.nonSelectedMovieTheaters)
  );
  const [selectedActors, setSelectedActors] = useState(props.selectedActors);

  function mapToModel(
    items: { id: number; name: string }[]
  ): multipleSelectorModel[] {
    return items.map((item) => {
      return { key: item.id, value: item.name };
    });
  }
  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, actions) => {
        values.genresIds = selectedGenres.map((item) => item.key);
        values.movieTheatersIds = selectedMovieTheaters.map((item) => item.key);
        values.actors = selectedActors;
        props.onSubmit(values, actions);
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required("This Field is required")
          .firstLetterUppercase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField field="title" labelText="Title" />
          <CheckBoxField labelText="In Theaters" field="inTheaters" />
          <TextField field="trailer" labelText="Trailer" />
          <DateField labelText="Release Date" field="releaseDate" />
          <ImageField
            labeltext="Poster"
            field="poster"
            imageURL={props.model.posterURL}
          />
          <MarkDownField labelText={"Summary"} field={"summary"} />

          <MultipleSelector
            labelText="Genres"
            nonSelected={nonSelectedGenres}
            selected={selectedGenres}
            onChange={(selected, nonSelected) => {
              setSelectedGenres(selected);
              setNonSelectedGenres(nonSelected);
            }}
          />
          <MultipleSelector
            labelText="Movie Theaters"
            nonSelected={nonSelectedMovieTheaters}
            selected={selectedMovieTheaters}
            onChange={(selected, nonSelected) => {
              setSelectedMovieTheaters(selected);
              setNonSelectedMovieTheaters(nonSelected);
            }}
          />
          <TypeAheadActors
            labelText="Actors"
            actors={selectedActors}
            onAdd={(actors) => {
              setSelectedActors(actors);
            }}
            onRemove={(actor) => {
              const actors = selectedActors.filter((x) => x !== actor);
              setSelectedActors(actors);
            }}
            listUI={(actor: actorMovieDTO) => (
              <>
                {actor.name}/
                <input
                  type="text"
                  placeholder="Charecter"
                  value={actor.character}
                  onChange={(e) => {
                    const index = selectedActors.findIndex(
                      (x) => x.id === actor.id
                    );
                    const actors = [...selectedActors];
                    actors[index].character = e.currentTarget.value;
                    setSelectedActors(actors);
                  }}
                />
              </>
            )}
          />
          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/movies">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface movieFormProps {
  model: movieCreationDTO;
  onSubmit(
    values: movieCreationDTO,
    action: FormikHelpers<movieCreationDTO>
  ): void;
  selectedGenres: genreDTO[];
  nonSelectedGenres: genreDTO[];
  selectedMovieTheaters: movieTheaterDTO[];
  nonSelectedMovieTheaters: movieTheaterDTO[];
  selectedActors: actorMovieDTO[];
}
