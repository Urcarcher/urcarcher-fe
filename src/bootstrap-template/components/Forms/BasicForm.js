import Axios from "axios"
import { Formik, Form as FormikForm, Field } from "formik"
import { param } from "jquery"
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

        console.log(values.password);

        // 카드삭제 및 비활성화
        if(props.cardId[0] === 'deleteCard'){
          Axios.post(`api/card/deletecard`,{
              cardId : props.cardId[1],
              password : values.password
            })
          .then((response)=>{
            alert('카드가 삭제되었습니다.');
          })
          .catch((error)=>{
            alert('카드 삭제가 실패하였습니다.');
          })
        }else if(props.cardId[0] === 'deactivate'){
          Axios.delete(`api/card/delete/${props.cardId[0]}`)
          .then((response)=>{
            alert('요청이 완료되었습니다.');
            props.setShowModal(false)
          })
          .catch((error)=>{
            alert('요청에 실패하였습니다.');
          })
        }

        props.setShowModal(false);
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
