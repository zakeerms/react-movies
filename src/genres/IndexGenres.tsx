import { urlGenres } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { genreDTO } from "./Genres.model";

export default function IndexGenres() {
  return (
    <>
      <IndexEntity<genreDTO>
        url={urlGenres}
        entityName="Genres"
        createURL="genres/create"
        title="Genres"
      >
        {(genres, buttons) => (
          <>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {genres?.map((genre) => (
                <tr key={genre.id}>
                  <td style={{ width: "80%" }}>{genre.name}</td>
                  <td>{buttons(`genres/edit/${genre.id}`, genre.id)}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
