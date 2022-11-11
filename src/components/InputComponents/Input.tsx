import React from "react";
import { Input as AntInput } from "antd";
import { Field } from "formik";
import ErrorMessage from "./ErrorMessage";
interface FromComponent {
  isDisabled?: boolean;
  name: string;
  placeholder?: string;
  suffix?: string;
  rest?: unknown;
}
const Input: React.FC<FromComponent> = props => {
  const { name, placeholder, isDisabled, suffix = "", ...rest } = props;
  const showPlaceholder = isDisabled ? "" : placeholder;

  async function handleOnBlur(
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: any,
    form: any
  ) {
    //field.onChange(e);
    form.setFieldValue(field.name, e.target.value);
    field.onBlur(e);
  }

  return (
    <>
      <Field
        name={name}
        render={({ field, form }: { field: any; form: any }) => {
          return (
            <AntInput
              {...rest}
              key={form.dirty}
              // className={styles.antInput}
              name={field.name}
              defaultValue={field.value}
              placeholder={showPlaceholder}
              disabled={isDisabled}
              onBlur={async e => {
                handleOnBlur(e, field, form);
              }}
              suffix={suffix}
              // {...rest}
            />
          );
        }}
      />
      <ErrorMessage name={name} />
    </>
  );
};

export default Input;
