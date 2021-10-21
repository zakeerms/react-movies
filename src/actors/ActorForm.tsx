import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { actorCreationDTO } from "./actord.model";
import * as Yup from "yup";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkDownField from "../forms/MarkDownField";

export default function ActorForm(props: actorFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("This Field is required")
          .firstLetterUppercase(),
        dateOfBirth: Yup.date().nullable().required("This Field is required"),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField field="name" labelText="Name" />
          <DateField labelText="Date of Birth" field="dateOfBirth" />
          <ImageField
            labeltext="Actor Image"
            field="picture"
            imageURL={props.model.pictureURL}
          />
          <MarkDownField labelText="Biography" field="biography" />
          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to="/actors">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface actorFormProps {
  model: actorCreationDTO;
  onSubmit(
    values: actorCreationDTO,
    action: FormikHelpers<actorCreationDTO>
  ): void;
}
