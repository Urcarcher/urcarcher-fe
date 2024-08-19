import { Container, Row, Col, Card } from "react-bootstrap"

import people from "../data/contacts.json"
import data from "../data/index-projects.json"

import widgetsStats from "../data/widgets-stats.json"
import People from "../components/People"
import Stats13 from "../components/Widgets/Stats13"
import Projects from "../components/Widgets/Projects"
import widgetsData from "../data/widgets-data.json"
import ActiveTickets from "../components/Widgets/ActiveTickets"
import Stats5 from "../components/Widgets/Stats5"
import DonutChart from "../components/charts/DonutChart"
import LineChart from "../components/charts/LineChart"

export async function getStaticProps() {
  return {
    props: {
      title: "Bubbly",
    },
  }
}
export default function IndexProjects() {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <div className="page-header d-flex justify-content-between align-items-center">
        <h1 className="page-heading">Projects Dashboard</h1>
      </div>
      <section className="mb-3 mb-lg-5">
        {/* Top Widgets */}
        <Row className="mb-3">
          {widgetsStats.group7.map((item, index) => (
            <Col sm={6} lg={3} key={index} className="mb-4">
              <Stats13 {...item} />
            </Col>
          ))}
        </Row>

        <Row className="mb-3">
          <Col lg={8} className="mb-4">
            {/* Projects widget */}
            <Projects data={widgetsData.projects} lightHeader />
          </Col>

          <Col lg={4} className="mb-4">
            {/* Popular Authors */}
            <People data={people.contacts.slice(0, 7)} title="Team Members" />
          </Col>
        </Row>
        <Row className="mb-3">
          {widgetsStats.group5.map((item, index) => (
            <Col md={6} key={index} className="mb-4">
              {/* Fifth stats widget */}
              <Stats5 {...item} />
            </Col>
          ))}
        </Row>
        {data.block1 && (
          <Row className="mb-3">
            <Col lg={7} className="mb-4">
              <Card className="h-100">
                <Card.Header>
                  <h4 className="card-heading">
                    {data.block1.graphs.main.name}
                  </h4>
                </Card.Header>
                <Card.Body>
                  <div className="chart-holder">
                    {data.block1.graphs.main.type === "line" ? (
                      <LineChart
                        className="w-100"
                        {...data.block1.graphs.main.data}
                      />
                    ) : (
                      <DonutChart
                        color={data.block1.graphs.main.color}
                        {...data.block1.graphs.main.data}
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5} className="mb-4">
              {data.block1.graphs.regular.map((graph, index) => (
                <div
                  className={`h-50 ${index === 0 ? "pb-4 pb-lg-2" : "pt-lg-2"}`}
                  key={index}
                >
                  <Card className="h-100">
                    <Card.Body className="d-flex">
                      <Row className="w-100 align-items-center">
                        <Col sm={5} className="mb-4 mb-sm-0">
                          <h2 className="mb-0 d-flex align-items-center">
                            <span>{graph.value}</span>
                            <span
                              className={`dot bg-${graph.color} d-inline-block ms-3`}
                            ></span>
                          </h2>
                          <span className="text-muted text-uppercase small">
                            {graph.name}
                          </span>
                          <hr />
                          <small className="text-muted">{graph.subtitle}</small>
                        </Col>
                        <Col sm={7}>
                          <DonutChart color={graph.color} {...graph.data} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Col>
          </Row>
        )}
        <Col xs={12} className="mb-4">
          {/* Active tickets widget */}
          <ActiveTickets data={widgetsData.activeTickets} />
        </Col>
      </section>
    </Container>
  )
}
