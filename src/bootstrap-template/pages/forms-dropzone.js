import { Card, Col, Container, Row } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import PageHeader from "../components/PageHeader"
import Dropzone from "../components/Dropzone"

import ExampleCode from "../components/ExampleCode"

export async function getStaticProps() {
  return {
    props: {
      title: "Multiple files upload",
    },
  }
}

export default function FormsDropdzone(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Card className="mb-4">
          <Card.Header>
            <h4 className="card-heading">
              Multiple files upload - Dropzone.js
            </h4>
          </Card.Header>
          <Card.Body>
            <p>
              DropzoneJS is an open source library that provides drag’n’drop
              file uploads with image previews.
            </p>
            <p>
              It’s lightweight, doesn’t depend on any other library (like
              jQuery) and is highly customizable.
            </p>
            <p>
              Theme has built in React wrapper which you can find in{" "}
              <code>src/components/Dropzone</code>
            </p>
            <ExampleCode highlightCode={highlightCode} bottomMargin />
            <Row>
              <Col xl={8} className="mx-auto">
                <Dropzone />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}

const highlightCode = `import Dropzone from "../components/Dropzone"

export default function page(props) {
  return(
    <Dropzone />
  )
}`
