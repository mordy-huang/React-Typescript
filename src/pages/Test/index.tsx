import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginout } from "@/pages/Home/models/HomeSlice";
import { Form, Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { TodoItem } from "@/types";
import { Values } from "../Login";
import FormItem from "antd/es/form/FormItem";
import * as Inputs from "@/components/InputComponents";
import { Button, Row } from "antd";
import { getErrorsFromValidationError, InputTextScheme } from "@/constants/common";
import * as Yup from "yup";
import { selecToduList } from "./models/TodoListSlice";
import {
  addToduList,
  updateToduList,
  deleteTodulist,
  getToduListData,
  reset,
} from "./models/TodoListSlice";

const AddToduListSchema = Yup.object().shape({
  name: InputTextScheme("name"),
});

const Test: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector(selecToduList);
  const formikRef = useRef<FormikProps<TodoItem>>(null);
  const onSubmit = () => {
    formikRef.current?.submitForm();
  };
  useEffect(() => {
    dispatch(getToduListData());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div>
      <h3>to do list</h3>
      <Formik
        enableReinitialize
        innerRef={formikRef}
        initialValues={{
          name: "",
          id: "",
        }}
        onSubmit={async (
          values: TodoItem,
          { setSubmitting, setErrors }: FormikHelpers<TodoItem>
        ) => {
          setSubmitting(true);
          try {
            AddToduListSchema.validateSync(values, { abortEarly: false });
            values.id != "" ? dispatch(updateToduList(values)) : dispatch(addToduList(values));
            formikRef.current?.resetForm();
            setSubmitting(false);
          } catch (errors) {
            const error = getErrorsFromValidationError(errors);
            setErrors(error as FormikErrors<TodoItem>);
            setSubmitting(false);
          }
        }}
      >
        {() => {
          const values = formikRef.current?.values;
          return (
            <Form>
              <Row>
                <FormItem>
                  <Inputs.Input name={"name"} isDisabled={false} />
                </FormItem>
                <Button style={{ marginLeft: 5 }} onClick={() => onSubmit()}>
                  {values?.id != "" ? "Update" : "Add"}{" "}
                </Button>
              </Row>
            </Form>
          );
        }}
      </Formik>

      <ul>
        {state.toduList.map(item => {
          return (
            <li key={item.id}>
              {item.name}
              <Button onClick={() => dispatch(deleteTodulist(item.id))} type={"text"} danger>
                delete
              </Button>
              <Button
                type={"text"}
                onClick={() => {
                  formikRef.current?.setValues(item);
                }}
              >
                {" "}
                edit
              </Button>
            </li>
          );
        })}
      </ul>
      <Link to="/Home">Home</Link>

    </div>
  );
};
export default Test;
