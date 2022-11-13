import React from "react";
import { Checkbox as AntCheckbox } from "antd";
import { Field, FieldInputProps, FormikProps } from "formik";
import ErrorMessage from "./ErrorMessage";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Values } from "@/pages/Login";
interface FromComponent {
  isDisabled?: boolean;
  name: string;
  placeholder?: string;
  suffix?: string;
  rest?: unknown;
}
const CheckBox: React.FC<FromComponent> = props => {
  const { name, isDisabled, suffix = "", ...rest } = props;

  async function handleOnBlur(
    e: CheckboxChangeEvent,
    field: any,
    form:  FormikProps<Values>
  ) {
    // console.log(field.name,'field.name,',e.target.checked);
    console.log(form.values,'vlaes',e.target.checked);
    
    form.setFieldValue(field.name, e.target.checked);
    console.log(form.values,'vlaes2',e.target.checked);
    // field.onBlur(e);
  }

  return (
    <>
      <Field
        name={name}
        render={({ field, form }: { field: FieldInputProps<any> ; form: FormikProps<Values> }) => {
          return (
            <AntCheckbox
              {...rest}            
              name={field.name}
              disabled={isDisabled}
              
              onChange={async e => {
                form.setFieldValue(field.name,e.target.checked)
              }}
            />
          );
        }}
      />
      <ErrorMessage name={name} />
    </>
  );
};

export default CheckBox;
