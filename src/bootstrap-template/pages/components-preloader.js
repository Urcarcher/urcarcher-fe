import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import ExampleCode from "../components/ExampleCode"
import PageHeader from "../components/PageHeader"
import Preloader from "../components/Preloader"
export async function getStaticProps() {
  return {
    props: {
      title: "Preloaders",
    },
  }
}

export default function ComponentsPreloader(props) {
  const preloaders = [
    {
      name: "Rotating Plane",
      type: "rotating-plane",
    },
    {
      name: "Double Bounce",
      type: "double-bounce",
      variant: "success",
    },
    {
      name: "Wave",
      type: "wave",
    },
    {
      name: "Wandering cubes",
      type: "wandering-cubes",
      variant: "warning",
    },
    {
      name: "Pulse",
      type: "pulse",
      variant: "info",
    },
    {
      name: "Chasing dots",
      type: "chasing-dots",
    },
    {
      name: "Three bounce",
      type: "three-bounce",
      variant: "danger",
    },
    {
      name: "Circle",
      type: "circle",
      variant: "warning",
    },
    {
      name: "Fading circle",
      type: "fading-circle",
      variant: "green",
    },
    {
      name: "Folding cube",
      type: "folding-cube",
      variant: "danger",
    },
  ]

  const [showSpinner, setShowSpinner] = useState(true)
  useEffect(() => {
    const spinnerTimer = setTimeout(() => {
      setShowSpinner(false)
    }, 2000)
    return () => clearTimeout(spinnerTimer)
  }, [])
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <div className={`spinner-wrapper ${!showSpinner ? "opacity-0" : ""}`}>
        <Preloader type="pulse" center />
      </div>

      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Card className="mb-4">
          <Card.Body className="text-muted">
            <p>
              This template comes with preloader component. You can pass{" "}
              <code>variant</code> and <code>type</code> props. You can find it
              in <code>src/components/Preoloader</code>. For list of all
              available types please follow{" "}
              <a href="https://github.com/tobiasahlin/SpinKit">
                SpinKit documentation
              </a>
              .
            </p>
            <p>
              SpinKit uses hardware accelerated (translate and opacity) CSS
              animations to create smooth and easily customizable animations.
            </p>
            <Card.Text>
              Read more about this great plugin at its{" "}
              <a href="https://github.com/tobiasahlin/SpinKit">
                Repository home
              </a>
              .
            </Card.Text>

            <ExampleCode highlightCode={highlightCode} />
          </Card.Body>
        </Card>
        <Row className="mt-3">
          {preloaders.map((item, index) => (
            <Col md={3} className="mb-4" key={index}>
              <Card className="h-100">
                <Card.Header className="card-heading">{item.name}</Card.Header>
                <Card.Body className="d-flex justify-content-center pt-5 pb-5">
                  <Preloader type={item.type} variant={item.variant} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  )
}

const highlightCode = `import Preloader from "../components/Preloader"

export default function page(props) {
  return(
    <Preloader type="pulse" variant="success" />
  )
}`
