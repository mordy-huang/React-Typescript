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
import { login } from "../Home/HomeSlice";
import { useDispatch } from "react-redux";
import { testMock } from "@/store/GrobalSlice";
export interface Values {
  username: string;
  password: string;
  remember: boolean;
}
const INVALID_REQUIRED = "is required.";
const InputTextScheme = (fieldName: string) => {
  return Yup.string()
    .nullable()
    .trim()
    .required(fieldName + " " + INVALID_REQUIRED);
};
// handleCompleteInspection = (values, setSubmitting, setErrors) => {
//   setSubmitting(true);
//   const validationSchema = getValidationSchema(values);
//   try {
//     validationSchema.validateSync(values, { abortEarly: false });
//     this.props
//       .dispatch({ type: 'smtInspectionEditing/updateStatusToCompleteInspection' })
//       .then(isSuccess => {
//         this.props.dispatch({
//           type: 'smtInspectionEditing/refreshInspection',
//           activeTabKey: '2',
//         });
//         setSubmitting(false);
//       });
//     setSubmitting(false);
//     return {};
//   } catch (error) {
//     // console.log('error exist');
//     const errors = getErrorsFromValidationError(error);
//     window.scrollTo(0, 0);
//     const tabKey = _findKey(errors.count, o => o > 0);
//     this.props.updateActiveInspectioFormTabKey(tabKey);
//     setErrors(errors);
//     setSubmitting(false);
//   }
// };
const SignupSchema = Yup.object().shape({
  username: InputTextScheme("Username"),
  password: InputTextScheme("Pass Word"),
  remember: Yup.boolean(),
});

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formikRef = React.useRef<FormikProps<Values>>(null);
  const onSubmit = () => {
    formikRef.current?.submitForm();
  };

  function getErrorsFromValidationError(validationError: any) {
    console.log("geterrorwith count");
    const FIRST_ERROR = 0;
    const errors = validationError.inner.reduce((errors:any, error:any) => {
      console.log(errors,error,"errors");
      
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      };
    }, {});

    const result = { ...errors };
    return { ...errors };
  }

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={{
          username: "",
          password: "",
          remember: false,
        }}
        onSubmit={(values: Values, { setSubmitting, setErrors }: FormikHelpers<Values>) => {
          setSubmitting(true);
          try {
            SignupSchema.validateSync(values, { abortEarly: false });
            // alert(JSON.stringify(values, null, 2));
            dispatch(login(JSON.stringify(values)));
            dispatch(testMock())
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
