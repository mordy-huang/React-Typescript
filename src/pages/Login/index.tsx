import Button from "antd/lib/button/button";
import Checkbox from "antd/lib/checkbox";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import { Formik, Field,useFormik } from "formik";
import { FormikHelpers,FormikProps } from "formik/dist/types";
import React, { useRef } from "react";
import * as Inputs from "@/components/InputComponents";

interface Values {
  username: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const formikRef = useRef<FormikProps<Values>>() as React.Ref<FormikProps<Values>>;
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  formikRef.current?.submitForm()
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {" "}
      {/* <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>xRemember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
      <Formik
        innerRef={formikRef}
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
        <Form>
          <Inputs.Input name={"username"} isDisabled={false} />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
