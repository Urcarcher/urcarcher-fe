import Breadcrumbs from "../../components/Breadcrumbs"
import PageHeader from "../../components/PageHeader"
import { Card, Col, Container, Row } from "react-bootstrap"
export async function getStaticProps() {
  return {
    props: {
      title: "Introduction",
    },
  }
}
export default function introduction(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs
        pages={[{ name: "Docs", link: "/docs/introduction" }]}
        title={props.title}
      />
      <PageHeader title={"Docs - " + props.title} />
      <section className="mb-5">
        <Row>
          <Col xl={10}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading"></h4>
              </Card.Header>
              <Card.Body>
                <p>
                  Hey, welcome to the{" "}
                  <strong>Bubbly Theme [React] official documentation</strong>.
                </p>
                <p>
                  If you own a theme’s license already, thank you very much for
                  purchasing! If not yet, you can{" "}
                  <a href="">buy the theme’s license here</a>.
                </p>
                <p>
                  This documentation is to help you with template’s
                  customization. Basic HTML and CSS knowledge is required to
                  customize this template.
                </p>
                <p>
                  Theme uses <b>React Bootstrap v5</b> plugin which extends the
                  Bootstrap framework and makes using Bootstrap in React easy.
                  Check out plugin documentation{" "}
                  <a href="https://react-bootstrap-v5.netlify.app/">here</a>.
                </p>
                <hr className="bg-gray-600 my-5" />
                <h5 className="text-uppercase mb-5">Theme info</h5>
                <p>
                  <span className="text-uppercase text-muted">Item Name:</span>{" "}
                  Bubbly [React]
                </p>
                <p>
                  <span className="text-uppercase text-muted">Author:</span>{" "}
                  Bootstrapious
                </p>
                <Card.Text>
                  <span className="text-uppercase text-muted">
                    Contact email for support &amp; pre-sale questions:{" "}
                  </span>
                  <a
                    className="text-dark"
                    href="mailto:hello@bootstrapious.com"
                  >
                    hello@bootstrapious.com
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
