import Button from "antd/lib/button/button";
import Checkbox from "antd/lib/checkbox";
import Input from "antd/lib/input";
import { Formik, Field, useFormik, Form } from "formik";
import { FormikHelpers, FormikProps } from "formik/dist/types";
import React, { useRef, useEffect } from "react";
import FormItem from "antd/es/form/FormItem";
import * as Yup from 'yup';
import * as Inputs from "@/components/InputComponents";

export interface Values {
  username: string;
  password: string;
  remember: boolean;
}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  remember: Yup.boolean()


});


const Login: React.FC = () => {
  const formikRef = React.useRef<FormikProps<Values>>(null);
  const onSubmit = () => {
    formikRef.current?.submitForm()

  }
  return (
    <>

      <Formik
        innerRef={formikRef}
        validationSchema={SignupSchema}
        initialValues={{
          username: "",
          password: "",
          remember: false,
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {/* <Form> */}
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
