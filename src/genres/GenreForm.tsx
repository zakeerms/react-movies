import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router";
import Button from "../utils/Button";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import { genreCreationDTO } from "./Genres.model";

export default function GenreForm(props: genreFormProps) {
  // const history = useHistory();
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("This Field is required")
            .max(50, "Maximum length is 50 characters")
            .firstLetterUppercase(),
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField field="name" labelText="Name" />
            <Button disabled={formikProps.isSubmitting} type="submit">
              Save Changes
            </Button>
            <Link className="btn btn-secondary" to="/genres">
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
      {/* <Button onClick={() => {
          //..saving
          history.push("/genres"); }} > Save Changes </Button> */}
    </>
  );
}

interface genreFormProps {
  model: genreCreationDTO;
  onSubmit(
    values: genreCreationDTO,
    action: FormikHelpers<genreCreationDTO>
  ): void;
}
