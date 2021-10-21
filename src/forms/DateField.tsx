import { useFormikContext } from "formik";

export default function DateField(props: dateFieldProps) {
  const { values, validateForm, touched, errors } = useFormikContext<any>();
  return (
    <div className="mb-3">
      <label htmlFor={props.field}>{props.labelText}</label>
      <input
        type="date"
        name={props.field}
        id={props.field}
        className="form-control"
        defaultValue={values[props.field]?.toLocaleDateString("en-CA")}
        onChange={(e) => {
          const date = new Date(e.currentTarget.value + "T00:00:00");
          values[props.field] = date;
          validateForm();
        }}
      ></input>
      {/* <ErrorMessage name={props.field}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage> */}
      {touched[props.field] && errors[props.field] ? (
        <div className="text-danger">{errors[props.field]?.toString()}</div>
      ) : null}
    </div>
  );
}

interface dateFieldProps {
  field: string;
  labelText: string;
}
