import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import * as Yup from "yup";
import MapField from "../forms/MapField";
import coordinatesDTO from "../utils/coordinates.model";

export default function MovieTheaterForm(props: movieTheaterFormProps) {
  function tranformCordinates(): coordinatesDTO[] | undefined {
    if (props.model.latitude && props.model.longitude) {
      const response: coordinatesDTO = {
        lat: props.model.latitude,
        lng: props.model.longitude,
      };
      return [response];
    }
    return undefined;
  }
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("This Field is required")
          .firstLetterUppercase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField field="name" labelText="Name" />
          <div style={{ marginBottom: "1rem" }}>
            <MapField
              latFiled="latitude"
              lngFiled="longitude"
              coordinates={tranformCordinates()}
            />
          </div>
          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/movietheaters">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface movieTheaterFormProps {
  model: movieTheaterCreationDTO;
  onSubmit(
    values: movieTheaterCreationDTO,
    action: FormikHelpers<movieTheaterCreationDTO>
  ): void;
}
