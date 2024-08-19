import { Card, Col, Row, Container } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import ExampleCode from "../components/ExampleCode"
import Gauge from "../components/Gauge"
import PageHeader from "../components/PageHeader"
import SparklineComponent from "../components/SparklineComponent"

export async function getStaticProps() {
  return {
    props: {
      title: "Charts - Gauges and Sparklines",
    },
  }
}
export default function ChartsGaugeSparkline(props) {
  const btc = [
    { name: "Bitcoin", date: "2017-01-01", value: 967.6 },
    { name: "Bitcoin", date: "2017-02-01", value: 957.02 },
    { name: "Bitcoin", date: "2017-03-01", value: 1190.78 },
    { name: "Bitcoin", date: "2017-04-01", value: 1071.48 },
    { name: "Bitcoin", date: "2017-05-01", value: 1354.21 },
    { name: "Bitcoin", date: "2017-06-01", value: 2308.08 },
    { name: "Bitcoin", date: "2017-07-01", value: 2483.5 },
    { name: "Bitcoin", date: "2017-08-01", value: 2839.18 },
    { name: "Bitcoin", date: "2017-09-01", value: 4744.69 },
    { name: "Bitcoin", date: "2017-10-01", value: 4348.09 },
    { name: "Bitcoin", date: "2017-11-01", value: 6404.92 },
  ]
  const eth = [
    { name: "Ethereum", date: "2017-01-01", value: 8.3 },
    { name: "Ethereum", date: "2017-02-01", value: 10.57 },
    { name: "Ethereum", date: "2017-03-01", value: 15.73 },
    { name: "Ethereum", date: "2017-04-01", value: 49.51 },
    { name: "Ethereum", date: "2017-05-01", value: 85.69 },
    { name: "Ethereum", date: "2017-06-01", value: 226.51 },
    { name: "Ethereum", date: "2017-07-01", value: 246.65 },
    { name: "Ethereum", date: "2017-08-01", value: 213.87 },
    { name: "Ethereum", date: "2017-09-01", value: 386.61 },
    { name: "Ethereum", date: "2017-10-01", value: 303.56 },
    { name: "Ethereum", date: "2017-11-01", value: 298.21 },
  ]
  const randNumbers = () => {
    var numbers = []

    for (var i = 0; i < 20; i += 1) {
      numbers.push(Math.random() * 50)
    }

    return numbers
  }
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Card className="mb-4">
          <Card.Header>
            <h4 className="card-heading">Gauges</h4>
          </Card.Header>
          <Card.Body>
            <p>
              100% native and cool looking animated JavaScript/CoffeeScript
              gauge. See more at{" "}
              <a href="http://bernii.github.io/gauge.js/">Gauge.js homepage.</a>
            </p>
            <p>
              Theme contains React wrapper for Gauge.js. You can find it in{" "}
              <code>src/components/Gauge</code>. Please remove demo code in{" "}
              <code>GaugeComponent.js</code> on production (follow comments).
            </p>
            <ExampleCode highlightCode={gaugeExample} />
            <Row className="mt-5">
              <Col md={3}>
                <Gauge value={Math.floor(Math.random() * 3000)} />
              </Col>
              <Col md={3}>
                <Gauge
                  color="#CF53F9"
                  value={Math.floor(Math.random() * 3000)}
                />
              </Col>
              <Col md={3}>
                <Gauge
                  color="#e95f71"
                  value={Math.floor(Math.random() * 3000)}
                />
              </Col>
              <Col md={3}>
                <Gauge
                  color="#7127AC"
                  value={Math.floor(Math.random() * 3000)}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-4">
          <Card.Header>
            <h4 className="card-heading">Sparkline</h4>
          </Card.Header>
          <Card.Body>
            <p>
              Generate SVG sparklines with JavaScript without any external
              dependency. See more at{" "}
              <a href="https://github.com/fnando/sparkline">
                Sparkline homepage.
              </a>
            </p>
            <p>
              Theme contains React Sparkline component. You can find it in{" "}
              <code>src/components/SparklineComponent</code>.
            </p>
            <ExampleCode highlightCode={sparklineExample} />
            <Row className="mt-5">
              <Col lg={6} xl={4} className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="position-relative flex-shrink-0">
                    <SparklineComponent
                      data={btc}
                      strokeWidth={2}
                      height={20}
                      stroke="blue"
                      showTooltip
                    />
                  </div>
                  <div className="ms-3">
                    <p className="fw-bold mb-0">BTC Price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="position-relative flex-shrink-0">
                    <SparklineComponent
                      data={eth}
                      strokeWidth={2}
                      height={20}
                      stroke="blue"
                      showTooltip
                    />
                  </div>
                  <div className="ms-3">
                    <p className="fw-bold mb-0">ETH Price</p>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <Row xs={{ cols: 2 }} md={{ cols: 4 }} lg={{ cols: 3 }}>
                  <Col className="mb-3">
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--red"
                    />
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--red sparkline--filled"
                    />
                  </Col>
                  <Col className="mb-3">
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--blue"
                    />
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--blue sparkline--filled"
                    />
                  </Col>
                  <Col className="mb-3">
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--green"
                    />
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--green sparkline--filled"
                    />
                  </Col>
                  <Col className="mb-3">
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--gray"
                    />
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--gray sparkline--filled"
                    />
                  </Col>
                  <Col className="mb-3">
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--orange"
                    />
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--orange sparkline--filled"
                    />
                  </Col>
                  <Col className="mb-3">
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--purple"
                    />
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--purple sparkline--filled"
                    />
                  </Col>
                  <Col className="mb-3">
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--yellow"
                    />
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--yellow sparkline--filled"
                    />
                  </Col>
                  <Col className="mb-3">
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--pink"
                    />
                    <SparklineComponent
                      strokeWidth={3}
                      height={30}
                      data={randNumbers()}
                      className="sparkline sparkline--pink sparkline--filled"
                    />
                  </Col>
                </Row>
              </Col>
              <div className="col-lg-6 col-xl-4 mb-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="position-relative flex-shrink-0"></div>
                </div>
              </div>
            </Row>
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}

const gaugeExample = `<Gauge color="#CF53F9" className="mb-5" min={100} max={4000} value={300} />`

const sparklineExample = `<SparklineComponent
  strokeWidth={3}
  height={30}
  data={[
    { name: "Bitcoin", date: "2017-01-01", value: 967.6 },
    { name: "Bitcoin", date: "2017-02-01", value: 957.02 },
    { name: "Bitcoin", date: "2017-03-01", value: 1190.78 }
  ]}
  className="mb-5"
  showTooltip
/>`
