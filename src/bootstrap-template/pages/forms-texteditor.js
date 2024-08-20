import { Card, Col, Container, Row } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import PageHeader from "../components/PageHeader"
import Editor from "../components/Editor"

import ExampleCode from "../components/ExampleCode"

export async function getStaticProps() {
  return {
    props: {
      title: "Text editor",
    },
  }
}

export default function FormsTexteditor(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Card className="mb-4">
          <Card.Header>
            <h4 className="card-heading">Text Editor - Quill</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xl={10}>
                <p className="text-muted">
                  Your powerful rich text editor. Supports all modern browsers
                  on desktops, tablets and phones. Experience the same
                  consistent behavior and produced HTML across platforms. Read
                  more at{" "}
                  <a href="https://quilljs.com/">https://quilljs.com/</a>.
                </p>
                <p className="text-muted">
                  Theme has built in React wrapper which you can find in{" "}
                  <code>src/components/Editor</code>
                </p>
                <h6 className="text-muted">
                  Avialble props for <code>{`<Editor />`}</code> component
                </h6>
                <ul>
                  <li>withEditor - enables editor buttons</li>
                  <li>className - adds classNames to editor</li>
                </ul>
                <ExampleCode highlightCode={highlightCode} bottomMargin />

                <Editor withEditor className="mb-3" />
                <Editor className="border" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}

const highlightCode = `import Editor from "../components/Editor"
export default function Page() {
  return (
    <Editor withEditor className="mb-3" />
  )
}`
