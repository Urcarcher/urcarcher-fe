import Breadcrumbs from "../../components/Breadcrumbs"
import PageHeader from "../../components/PageHeader"
import { Badge, Card, Col, Container, Row } from "react-bootstrap"
export async function getStaticProps() {
  return {
    props: {
      title: "Customizing CSS",
    },
  }
}
export default function customizingCSS(props) {
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
                <div id="scssmethod" className="docs-item">
                  <h5 className="mb-4">SCSS Method</h5>
                  <div className="docs-desc"></div>
                  <div>
                    <p>
                      The most flexible way to edit the theme CSS or to add your
                      own code and components to use SCSS. As mentioned before,
                      there are two files already prepared for your changes -{" "}
                      <code>_user-variables.scss</code> and{" "}
                      <code>_user.scss</code>.
                    </p>
                    <p>
                      To configure the theme, e.g. to change colours for some
                      elements, to change font sizes, etc., use{" "}
                      <code>_user-variables.scss</code>. Any variable from{" "}
                      <code>scss/bootstrap/_variables.scss</code> or{" "}
                      <code>scss/modules/_variables.scss</code> can be
                      overridden here with your own value.
                    </p>
                    <p>
                      To add your own CSS code, declare it in the{" "}
                      <code>_user.scss</code> file.
                    </p>
                    <p>
                      SCSS is automatically compiled if you're running{" "}
                      <code>next.js</code> development mode.
                    </p>
                    <Badge bg="info-light" text="info">
                      Recommended
                    </Badge>
                  </div>
                </div>
                <div id="scssmethod" className="docs-item">
                  <h5 className="mb-4">Importing CSS</h5>
                  <div className="docs-desc"></div>
                  <div>
                    <p>
                      If you need to import css files for plugins, you can do it
                      in<code>/src/pages/_app.js</code> using following syntax{" "}
                      <code>import 'plugin/plugin.css'</code>.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
