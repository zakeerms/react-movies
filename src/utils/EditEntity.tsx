import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useHistory, useParams } from "react-router";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";

export default function EditEntity<TCreation, TRead>(
  props: editEntityProps<TCreation, TRead>
) {
  const { id }: any = useParams();
  const [errors, setErrors] = useState<string[]>([]);
  const [entity, setEntity] = useState<TCreation>();
  const history = useHistory();
  useEffect(() => {
    axios.get(`${props.url}/${id}`).then((response: AxiosResponse<TRead>) => {
      setEntity(props.transform(response.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function edit(entityToEdit: TCreation) {
    try {
      if (props.transformFormData) {
        const formData = props.transformFormData(entityToEdit);
        await axios({
          method: "put",
          url: `${props.url}/${id}`,
          data: formData,
          headers: { "content-type": "multipart/form-data" },
        });
      } else {
        await axios.put(`${props.url}/${id}`, entityToEdit);
      }
      history.push(props.indexURL);
    } catch (error) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Edit {props.entityName}</h3>
      <DisplayErrors errors={errors} />
      {entity ? props.children(entity, edit) : <Loading />}
    </>
  );
}

interface editEntityProps<TCreation, TRead> {
  url: string;
  indexURL: string;
  entityName: string;
  transform(entity: TRead): TCreation;
  transformFormData?(model: TCreation): FormData;
  children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
  transform: (entity: any) => entity,
};
