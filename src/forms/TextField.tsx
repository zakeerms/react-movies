import { ErrorMessage, Field } from "formik";

export default function TextField(props: textFieldProps) {
  return (
    <div className="mb-3">
      <label htmlFor={props.field}>{props.labelText}</label>
      <Field
        type={props.type}
        name={props.field}
        id={props.field}
        className="form-control"
      ></Field>
      <ErrorMessage name={props.field}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage>
    </div>
  );
}

interface textFieldProps {
  field: string;
  labelText: string;
  type: "text" | "password";
}

TextField.defaultProps = {
  type: "text",
};
