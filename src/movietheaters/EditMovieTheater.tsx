import { urlMovieTheaters } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { movieTheaterCreationDTO, movieTheaterDTO } from "./movieTheater.model";
import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater() {
  return (
    <>
      <EditEntity<movieTheaterCreationDTO, movieTheaterDTO>
        url={urlMovieTheaters}
        entityName="MovieTheaters"
        indexURL="/movietheaters"
      >
        {(entity, edit) => (
          <MovieTheaterForm
            model={entity}
            onSubmit={async (value) => {
              await edit(value);
            }}
          />
        )}
      </EditEntity>
    </>
  );
}
