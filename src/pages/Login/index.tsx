import Button from "antd/lib/button/button";
import Checkbox from "antd/lib/checkbox";
import Input from "antd/lib/input";
import { Formik, Field, useFormik, Form } from "formik";
import { FormikErrors, FormikHelpers, FormikProps } from "formik/dist/types";
import React, { useRef, useEffect } from "react";
import FormItem from "antd/es/form/FormItem";
import * as Yup from "yup";
import * as Inputs from "@/components/InputComponents";
import { AppDispatch } from "@/store";
import { login } from "../Home/models/HomeSlice";
import { useDispatch } from "react-redux";
import { testMock, validateAccount } from "@/store/GrobalSlice";
import { getErrorsFromValidationError, InputTextScheme } from "@/constants/common";
export interface Values {
  username: string;
  password: string;
  remember: boolean;
}

const SignupSchema = Yup.object().shape({
  username: InputTextScheme("Username"),
  password: InputTextScheme("Pass Word"),
  remember: Yup.boolean(),
});

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formikRef = useRef<FormikProps<Values>>(null);
  const onSubmit = () => {
    formikRef.current?.submitForm();
  };


  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={{
          username: "",
          password: "",
          remember: false,
        }}
        onSubmit={ async(values: Values, { setSubmitting, setErrors }: FormikHelpers<Values>) => {
          setSubmitting(true);

          try {
            SignupSchema.validateSync(values, { abortEarly: false });
            dispatch(validateAccount(values))
            setSubmitting(false);
          } catch (errors) {
            const error = getErrorsFromValidationError(errors);
            setErrors(error as FormikErrors<Values>);
            setSubmitting(false);
          }
        }}
      >
        <Form>
          <FormItem label={"User Name"}>
            <Inputs.Input name={"username"} isDisabled={false} />
          </FormItem>
          <FormItem label={"Password"}>
            <Inputs.Input name={"password"} isDisabled={false} />
          </FormItem>
          <FormItem label={"IsRemeber"}>
            <Inputs.CheckBox name={"remember"} isDisabled={false} />
          </FormItem>

          <Button onClick={() => onSubmit()}> Submit </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
