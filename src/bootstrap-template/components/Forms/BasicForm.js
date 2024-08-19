import { Formik, Form as FormikForm, Field } from "formik"
import React from "react"
import { Form, Button } from "react-bootstrap"

export default function BasicForm() {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500))
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <FormikForm>
        <div className="mb-3">
          <Form.Label className="text-uppercase" htmlFor="email">
            Email
          </Form.Label>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <Form.Label className="text-uppercase" htmlFor="email">
            Password
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
            Log in
          </Button>
        </div>
      </FormikForm>
    </Formik>
  )
}
