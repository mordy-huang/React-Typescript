import * as Yup from "yup";

const INVALID_REQUIRED = "is required.";

export const InputTextScheme = (fieldName: string) => {
  return Yup.string()
    .nullable()
    .trim()
    .required(fieldName + " " + INVALID_REQUIRED);
};

export function getErrorsFromValidationError(validationError: any) {
  console.log("geterrorwith count");
  const FIRST_ERROR = 0;
  const errors = validationError.inner.reduce((errors: any, error: any) => {
    console.log(errors, error, "errors");

    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});

  const result = { ...errors };
  return { ...errors };
}
