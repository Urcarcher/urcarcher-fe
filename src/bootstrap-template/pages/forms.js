import { Card, Col, Container, Row } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import BasicForm from "../components/Forms/BasicForm"
import InlineForm from "../components/Forms/InlineForm"
import HorizontalForm from "../components/Forms/HorizontalForm"
import PageHeader from "../components/PageHeader"
import InputsFloatingLabels from "../components/Forms/InputsFloatingLabels"
import ModalForm from "../components/Forms/ModalForm"
import AllFormElements from "../components/Forms/AllFormElements"
import ExampleCode from "../components/ExampleCode"
export async function getStaticProps() {
  return {
    props: {
      title: "Forms",
    },
  }
}

export default function Forms(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Card className="mb-5">
          <Card.Header>
            <h4 className="card-heading">Formik</h4>
          </Card.Header>
          <Card.Body>
            <p>
              The theme has integrated excellent Formik plugin for easy
              validation and onChange events input handling. Please visit{" "}
              <a href="https://formik.org/docs/overview">
                Formik documentation
              </a>{" "}
              for more info
            </p>
            <ExampleCode highlightCode={formikExample} />
          </Card.Body>
        </Card>
        <Row>
          <Col lg={6} className="mb-5">
            <Card>
              <Card.Header>
                <h4 className="card-heading">Basic Form</h4>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-4">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <BasicForm />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-5">
            <Card>
              <Card.Header>
                <h4 className="card-heading">Horizontal Form</h4>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-4">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <HorizontalForm />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-5">
            <Card>
              <Card.Header>
                <h4 className="card-heading">Inputs with floating labels</h4>
              </Card.Header>
              <Card.Body>
                <InputsFloatingLabels />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="mb-5">
            <Card>
              <Card.Header>
                <h4 className="card-heading">Modal Form</h4>
              </Card.Header>
              <Card.Body>
                <ModalForm />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} className="mb-5">
            <Card>
              <Card.Header>
                <h4 className="card-heading">All form elements</h4>
              </Card.Header>
              <Card.Body>
                <AllFormElements />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}

const formikExample = `import { Formik, Form as FormikForm, Field } from "formik"

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
`
