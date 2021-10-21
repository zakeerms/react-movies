import { Field } from "formik";

export default function CheckBoxField(props: checkBoxFieldProps) {
  return (
    <div className="mb-3 form-check">
      <Field
        className="form-check-input"
        id={props.field}
        name={props.field}
        type="checkbox"
      />
      <label htmlFor={props.field}>{props.labelText}</label>
    </div>
  );
}

interface checkBoxFieldProps {
  labelText: string;
  field: string;
}
