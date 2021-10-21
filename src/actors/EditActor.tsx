import { urlActors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import convertActorToFormData from "../utils/formDataUtils";
import { actorCreationDTO, actorDTO } from "./actord.model";
import ActorForm from "./ActorForm";

export default function EditActor() {
  function transform(actor: actorDTO): actorCreationDTO {
    return {
      name: actor.name,
      pictureURL: actor.picture,
      biography: actor.biography,
      dateOfBirth: new Date(actor.dateOfBirth),
    };
  }
  return (
    <>
      <EditEntity<actorCreationDTO, actorDTO>
        url={urlActors}
        entityName="Actors"
        indexURL="/actors"
        transformFormData={convertActorToFormData}
        transform={transform}
      >
        {(entity, edit) => (
          <ActorForm
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
