import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import "./MarkdownField.css";
export default function MarkDownField(props: markDownFieldProps) {
  const { values } = useFormikContext<any>();
  return (
    <div className="mb-3 form-markdown">
      <div>
        <label>{props.labelText}</label>
        <div>
          <Field name={props.field} as="textarea" className="form-textarea" />
        </div>
      </div>
      <div>
        <label>{props.labelText}(Preview)</label>
        <div className="markdown-container">
          <ReactMarkdown>{values[props.field]}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

interface markDownFieldProps {
  labelText: string;
  field: string;
}
