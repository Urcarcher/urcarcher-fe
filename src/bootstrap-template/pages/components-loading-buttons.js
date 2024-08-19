import { Card, Container } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import PageHeader from "../components/PageHeader"

import LoadingButton from "../components/LoadingButton"
import ProgressButton from "../components/ProgressButton"
export async function getStaticProps() {
  return {
    props: {
      title: "Loading buttons",
    },
  }
}
export default function ComponentsLoadingButtons(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Card>
          <Card.Header>
            <h4 className="card-heading">Loading Buttons - Ladda</h4>
          </Card.Header>
          <Card.Body>
            <p>
              A UI concept which merges loading indicators into the action that
              invoked them. Primarily intended for use with forms where it gives
              users immediate feedback upon submit rather than leaving them
              wondering while the browser does its thing.
            </p>
            <p>
              <LoadingButton label="expand-left" className="mb-1 me-1" />
              <LoadingButton
                label="expand-right"
                type="expand-right"
                className="mb-1 me-1"
              />
              <LoadingButton
                label="expand-up"
                type="expand-up"
                className="mb-1 me-1"
              />
              <LoadingButton
                label="expand-down"
                type="expand-down"
                className="mb-1 me-1"
              />
            </p>
            <p>
              <LoadingButton
                label="zoom-in"
                type="zoom-in"
                variant="info"
                className="mb-1 me-1"
              />
              <LoadingButton
                label="zoom-out"
                type="zoom-out"
                variant="info"
                className="mb-1 me-1"
              />
            </p>

            <p>
              <LoadingButton
                label="slide-left"
                type="slide-left"
                variant="warning"
                className="mb-1 me-1"
              />
              <LoadingButton
                label="slide-left"
                type="slide-left"
                variant="warning"
                className="mb-1 me-1"
              />
              <LoadingButton
                label="slide-up"
                type="slide-up"
                variant="warning"
                className="mb-1 me-1"
              />
              <LoadingButton
                label="slide-down"
                type="slide-down"
                variant="warning"
                className="mb-1 me-1"
              />
            </p>
            <h5>Built-in progress bar</h5>
            <p className="ladda-progress-demo">
              <ProgressButton
                label="expand-left"
                variant="danger"
                className="mb-1 me-1"
              />
              <ProgressButton
                label="expand-right"
                type="expand-right"
                variant="danger"
                className="mb-1 me-1"
              />
              <ProgressButton
                label="expand-up"
                type="expand-up"
                variant="danger"
                className="mb-1 me-1"
              />
            </p>
            <h5>Sizes</h5>
            <Card.Text>
              <LoadingButton
                label="small"
                size="sm"
                type="expand-right"
                className="mb-1 me-1"
              />
              <LoadingButton
                label="normal"
                type="expand-right"
                className="mb-1 me-1"
              />
              <LoadingButton
                label="large"
                type="expand-right"
                size="lg"
                className="mb-1 me-1"
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}
