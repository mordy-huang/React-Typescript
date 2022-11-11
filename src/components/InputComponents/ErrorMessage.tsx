import { connect } from "formik";
import _isEmpty from "lodash/isEmpty";
import React from "react";
interface ErrorProps {
  formik?: any;
  name: string;
}
const ErrorMessage: React.FC<ErrorProps> = props => {
  const { errors } = props.formik;
  const error = !_isEmpty(errors) ? errors[props.name] : "";

  return error ? (
    <div className="error-message" style={{ color: "red" }}>
      {error}
    </div>
  ) : null;
};

export default connect(ErrorMessage);
