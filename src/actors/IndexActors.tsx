import { urlActors } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { actorDTO } from "./actord.model";

export default function IndexActors() {
  return (
    <>
      <IndexEntity<actorDTO>
        url={urlActors}
        entityName="Create"
        createURL="actors/create"
        title="Actors"
      >
        {(actors, buttons) => (
          <>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {actors?.map((actor) => (
                <tr key={actor.id}>
                  <td style={{ width: "80%" }}>{actor.name}</td>
                  <td>{buttons(`actors/edit/${actor.id}`, actor.id)}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
}
