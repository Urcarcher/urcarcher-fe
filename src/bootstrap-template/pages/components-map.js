import { Card, Col, Container, Row } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import ExampleCode from "../components/ExampleCode"
import Map from "../components/Map"
import PageHeader from "../components/PageHeader"

import restaurants from "../data/restaurants-geojson.json"

export async function getStaticProps() {
  return {
    props: {
      title: "Maps",
    },
  }
}
export default function ComponentsMap(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Row>
          <Col xl={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading">Basic Map - One marker</h4>
              </Card.Header>
              <Card.Body>
                <p>
                  This is a basic Leaflet map implementation with a custom
                  marker. Everything is for you and this map can be created by
                  calling a simple function.
                </p>
                <ExampleCode highlightCode={basicHighlightCode} bottomMargin />

                <div className="map" style={{ height: "400px" }}>
                  <Map
                    center={[40.732346, -74.0014247]}
                    zoom={13}
                    className="h-100"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading">Styled Map - One marker</h4>
              </Card.Header>
              <Card.Body>
                <p>
                  An example of the styled Leaflet map with a custom marker. You
                  can easily replace the look by changin to another theme from{" "}
                  <a href="https://leaflet-extras.github.io/leaflet-providers/preview/">
                    Leaflet Providers
                  </a>
                  .
                </p>
                <ExampleCode highlightCode={styledHighlightCode} bottomMargin />
                <div className="map" style={{ height: "400px" }}>
                  <Map
                    center={[40.732346, -74.0014247]}
                    zoom={13}
                    className="h-100"
                    light
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Card className="mb-4">
          <Card.Header>
            <h4 className="card-heading">
              Styled Map - Multiple markers with infobox, images and structured
              content from JSON
            </h4>
          </Card.Header>
          <Card.Body>
            <p>
              More complex implementation: data are loaded from a JSON file and
              custom infobox with an image is used in this example. Again,
              everything's prepared for you.
            </p>
            <ExampleCode highlightCode={advancedHighlightCode} bottomMargin />
            <div className="map" style={{ height: "600px" }}>
              <Map
                center={[40.732346, -74.0014247]}
                zoom={13}
                className="h-100"
                geoJSON={restaurants}
              />
            </div>
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}

const basicHighlightCode = `import Map from "../components/Map""

export default function page(props) {
  return(
    <div className="map" style={{ height: "400px" }}>
      <Map
        center={[40.732346, -74.0014247]}
        zoom={13}
        className="h-100"
      />
    </div>
  )
}`

const styledHighlightCode = `import Map from "../components/Map""

export default function page(props) {
  return(
    <div className="map" style={{ height: "400px" }}>
      <Map
        center={[40.732346, -74.0014247]}
        zoom={13}
        className="h-100"
        light
      />
    </div>
  )
}`

const advancedHighlightCode = `import Map from "../components/Map""

export default function page(props) {
  return(
    <div className="map" style={{ height: "600px" }}>
      <Map
        center={[40.732346, -74.0014247]}
        zoom={13}
        className="h-100"
        geoJSON={data} // JSON data file 
      />
    </div>
  )
}`
