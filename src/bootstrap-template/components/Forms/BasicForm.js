import { Formik, Form as FormikForm, Field } from "formik"
import React from "react"
import { Form, Button } from "react-bootstrap"

export default function BasicForm(props) {
  return (
    <Formik
      initialValues={{
        text: "",
        password: "",
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500))
        // ******* be 전달시 ********
        //alert(JSON.stringify(values, null, 2))
        alert('요청이 완료되었습니다.');
        // props 방식으로 회전
        props.setShowModal(false)
      }}
    >
      <FormikForm>
        <div className="mb-3">
          <Form.Label className="text-uppercase" htmlFor="text">
            {props.textContent}
          </Form.Label>
          <Field
            id="text"
            name="text"
            type="text"
            placeholder="Reason"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <Form.Label className="text-uppercase" htmlFor="password">
            {props.passwordContent}
          </Form.Label>
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <Button variant="primary" type="submit">
            {props.buttonContent}
          </Button>
        </div>
      </FormikForm>
    </Formik>
  )
}
