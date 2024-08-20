import Breadcrumbs from "../../components/Breadcrumbs"
import PageHeader from "../../components/PageHeader"
import { Card, Col, Container, Row } from "react-bootstrap"

import IconsBubbly from "../../components/Docs/ComponentsTheme/IconsBubbly"
import IconsFontAwesome from "../../components/Docs/ComponentsTheme/IconsFontAwesome"
import Avatars from "../../components/Docs/ComponentsTheme/Avatars"
import Badges from "../../components/Docs/ComponentsTheme/Badges"
import CardWidget from "../../components/Docs/ComponentsTheme/CardWidget"
import BackgroundImages from "../../components/Docs/ComponentsTheme/BackgroundImage"
import ImageOverlay from "../../components/Docs/ComponentsTheme/ImageOverlay"
import ResponsiveBorders from "../../components/Docs/ComponentsTheme/ResponsiveBorders"
import BlockUtilities from "../../components/Docs/ComponentsTheme/BlockUtilities"
import TextUtilities from "../../components/Docs/ComponentsTheme/TextUtilities"
export async function getStaticProps() {
  return {
    props: {
      title: "CSS Components",
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
      <PageHeader title={"Theme " + props.title} />
      <section className="mb-5">
        <Row>
          <Col xl={10}>
            <Card className="mb-5">
              <Card.Header>
                <h4 className="card-heading">{props.title}</h4>
              </Card.Header>
              <Card.Body>
                <Avatars />
                <Badges />
                <CardWidget />
                <IconsBubbly />

                <IconsFontAwesome />
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <h5 className="card-heading">CSS Utilities</h5>
              </Card.Header>
              <Card.Body>
                <BackgroundImages />
                <ImageOverlay />
                <ResponsiveBorders />
                <BlockUtilities />
                <TextUtilities />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
