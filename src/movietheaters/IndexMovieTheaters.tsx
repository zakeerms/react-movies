import { urlMovieTheaters } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { movieTheaterDTO } from "./movieTheater.model";

export default function IndexMovieTheaters() {
  return (
    <>
      <IndexEntity<movieTheaterDTO>
        url={urlMovieTheaters}
        entityName="Movie Theaters"
        createURL="movietheaters/create"
        title="Movie Theaters"
      >
        {(movietheaters, buttons) => (
          <>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {movietheaters?.map((movietheater) => (
                <tr key={movietheater.id}>
                  <td style={{ width: "80%" }}>{movietheater.name}</td>
                  <td>
                    {buttons(
                      `movietheaters/edit/${movietheater.id}`,
                      movietheater.id
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
