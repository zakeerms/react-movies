import axios from "axios";
import { useState } from "react";
import { urlActors } from "../endpoints";
import { actorCreationDTO } from "./actord.model";
import ActorForm from "./ActorForm";
import { useHistory } from "react-router";
import DisplayErrors from "../utils/DisplayErrors";
import convertActorToFormData from "../utils/formDataUtils";

export default function CreateActor() {
  const history = useHistory();
  const [errors, setErrors] = useState<string[]>([]);

  async function create(actor: actorCreationDTO) {
    try {
      const formData = convertActorToFormData(actor);
      await axios({
        method: "post",
        url: urlActors,
        data: formData,
        headers: { "content-type": "multipart/form-data" },
      });
      history.push("/actors");
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>Create Actor</h3>
      <DisplayErrors errors={errors} />
      <ActorForm
        model={{ name: "", dateOfBirth: undefined }}
        onSubmit={async (value) => {
          await create(value);
        }}
      />
    </>
  );
}
