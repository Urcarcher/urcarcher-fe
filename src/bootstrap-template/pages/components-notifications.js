import { useState } from "react"
import { Button, Card, Container, Toast } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import ExampleCode from "../components/ExampleCode"
import PageHeader from "../components/PageHeader"
export async function getStaticProps() {
  return {
    props: {
      title: "Notifications",
    },
  }
}

export default function ComponentsNotifications(props) {
  const [toasts, setToasts] = useState({
    first: false,
    second: false,
    third: false,
  })
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Card>
          <Card.Header>
            <h4 className="card-heading">Notifications</h4>
          </Card.Header>
          <Card.Body>
            <p className="text-muted">
              Toasts are lightweight notifications designed to mimic the push
              notifications that have been popularized by mobile and desktop
              operating systems. They’re built with flexbox, so they’re easy to
              align and position.
            </p>
            <p className="text-muted">
              Read more about toast in the official{" "}
              <a href="https://react-bootstrap-v5.netlify.app/components/toasts/">
                React Bootstrap Docs
              </a>
              .{" "}
            </p>
            <ExampleCode highlightCode={highlightCode} bottomMargin />
            <p>
              <Button
                variant="success"
                onClick={() => setToasts({ ...toasts, first: !toasts.first })}
              >
                Success Message
              </Button>
            </p>
            <p>
              <Button
                variant="danger"
                onClick={() => setToasts({ ...toasts, second: !toasts.second })}
              >
                Error Message
              </Button>
            </p>
            <p>
              <Button
                variant="info"
                onClick={() => setToasts({ ...toasts, third: !toasts.third })}
              >
                Info Message
              </Button>
            </p>
            <div className="toast-container position-fixed z-index-50 bottom-0 end-0 p-3">
              <Toast
                show={toasts.first}
                onClose={() => setToasts({ ...toasts, first: false })}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <span className="dot bg-success me-2" />
                  <div className="card-heading text-dark me-auto">Bubbly </div>
                  <small>11 mins ago</small>
                </Toast.Header>

                <Toast.Body className="text-muted">
                  Hello, world! This is a toast message.
                </Toast.Body>
              </Toast>
              <Toast
                show={toasts.second}
                onClose={() => setToasts({ ...toasts, second: false })}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <span className="dot bg-danger me-2" />
                  <div className="card-heading text-dark me-auto">Bubbly </div>
                  <small>11 mins ago</small>
                </Toast.Header>

                <Toast.Body className="text-muted">
                  Hello, world! This is a toast message.
                </Toast.Body>
              </Toast>
              <Toast
                show={toasts.third}
                onClose={() => setToasts({ ...toasts, third: false })}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <span className="dot bg-info me-2" />
                  <div className="card-heading text-dark me-auto">Bubbly </div>
                  <small>11 mins ago</small>
                </Toast.Header>

                <Toast.Body className="text-muted">
                  Hello, world! This is a toast message.
                </Toast.Body>
              </Toast>
            </div>
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}

const highlightCode = `import { Toast } from "react-bootstrap"

export default function page(props) {
  const [toastState, setToastState] = useState(false)

  return(
    <Toast
      show={toastsState}
      onClose={() => setToasts(toastState)}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <span className="dot bg-info me-2" />
        <div className="card-heading text-dark me-auto">Bubbly </div>
        <small>11 mins ago</small>
      </Toast.Header>

      <Toast.Body className="text-muted">
        Hello, world! This is a toast message.
      </Toast.Body>
    </Toast>
  )
}`
