import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"

import { Container, Row, Col, Card, Badge } from "react-bootstrap"

import data from "../data/index.json"

import Stats1 from "../components/Widgets/Stats1"
import widgetsStats from "../data/widgets-stats.json"
import widgetsData from "../data/widgets-data.json"
import BarChart2 from "../components/charts/BarChart2"
import Icon from "../components/Icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CardHeaderMore from "../components/CardHeaderMore"
import Activity from "../components/Activity"
import Contracts from "../components/Contracts"
import Stats7 from "../components/Widgets/Stats7"
import Stats6 from "../components/Widgets/Stats6"
import Projects2 from "../components/Widgets/Projects2"
import CustomDonutChart from "../components/charts/CustomDonutChart"
import PieChart from "../components/charts/PieChart"
export async function getStaticProps() {
  return {
    props: {
      title: "Bubbly",
    },
  }
}
export default function Index() {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <div className="page-header d-flex justify-content-between align-items-center">
        <h1 className="page-heading">Default dashboard</h1>
      </div>
      <section className="mb-3 mb-lg-5">
        <Row className="mb-3">
          {widgetsStats.group1.map((item, index) => (
            <Col sm={6} lg={3} key={index} className="mb-4">
              {/* First stats widget */}
              <Stats1 {...item} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col xl={9} className="mb-4">
            <Card>
              <Card.Header>
                <h5 className="card-heading">Sales by channel</h5>
                <CardHeaderMore />
              </Card.Header>
              <Card.Body>
                <Row className="mb-5">
                  <Col xs={12} sm="auto" className="flex-sm-grow-1 py-3">
                    <h3 className="subtitle text-gray-500">Total Revenue</h3>
                    <div className="h1 text-primary">$19,200</div>
                    <p className="mb-0">
                      <span className="text-muted me-3">+$2,032 </span>
                      <Badge bg="success-light" text="success">
                        <FontAwesomeIcon icon={faArrowUp} className="me-2" />
                        19.5%
                      </Badge>
                    </p>
                  </Col>
                  <Col
                    xs={6}
                    sm="auto"
                    className="flex-sm-grow-1 border-start py-3 d-flex align-items-center"
                  >
                    <div>
                      <h3 className="subtitle text-gray-500 fw-normal">
                        Organic Search{" "}
                      </h3>
                      <div className="h4 fw-normal text-dark">$19,200</div>
                      <p className="mb-0">
                        <span className="text-muted me-2">+$2,123 </span>
                        <Badge bg="success-light" text="success">
                          <FontAwesomeIcon icon={faArrowUp} className="me-2" />
                          21.3%
                        </Badge>
                      </p>
                    </div>
                  </Col>
                  <Col
                    xs={6}
                    sm="auto"
                    className="flex-sm-grow-1 border-start py-3 d-flex align-items-center"
                  >
                    <div>
                      <h3 className="subtitle text-gray-500 fw-normal">
                        Facebook Ads{" "}
                      </h3>
                      <div className="h4 fw-normal text-dark">$2,500</div>
                      <p className="mb-0">
                        <span className="text-muted me-2">-$233 </span>
                        <Badge bg="danger-light" text="danger">
                          <FontAwesomeIcon
                            icon={faArrowDown}
                            className="me-2"
                          />
                          -2.1%
                        </Badge>
                      </p>
                    </div>
                  </Col>
                  <Col
                    xs="auto"
                    className="d-none d-md-flex d-xl-none d-xxl-flex align-items-center"
                  >
                    <div className="icon icon-xl ms-2 bg-primary-light">
                      <Icon className="text-primary" icon="pay-1" />
                    </div>
                  </Col>
                </Row>
                <BarChart2 {...data.sales.chart} />
                <ul className="mt-4 text-gray-500 list-inline card-text text-center">
                  <li className="list-inline-item">
                    <span className="indicator bg-primary" />
                    Organic Search
                  </li>
                  <li className="list-inline-item">
                    <span
                      className="indicator"
                      style={{ background: "#d0d2f3" }}
                    />
                    Facebook Ads
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Latest activity */}
          <Col xl={3}>
            <div className="card-adjust-height-xl">
              <Activity />
            </div>
          </Col>
        </Row>

        {/* Contracts */}
        <Contracts />

        <Row>
          {/* New customers */}
          <Col md={6} className="mb-4">
            <Stats6 {...widgetsStats.stats6} />
          </Col>

          {/* Stats */}
          <Col md={6} className="mb-4">
            <Stats7 data={widgetsStats.stats7} />
          </Col>
        </Row>

        <Row>
          {/* Projects updates */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <Projects2 data={widgetsData.projects2} title="Projects updates" />
          </Col>

          {/* Closed projects */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card className="h-100">
              <Card.Header>
                <h5 className="card-heading">{data.closedProjects.title}</h5>
                <CardHeaderMore />
              </Card.Header>
              <Card.Body>
                <CustomDonutChart {...data.closedProjects.chart} />
              </Card.Body>
              <Card.Footer className="bg-white">
                <h3 className="subtitle text-gray-500 fw-normal text-center">
                  {data.closedProjects.subtitle}
                </h3>
                <Row className="justify-content-center align-items-center">
                  <Col xs="auto">
                    <div className="h4 mb-0">{data.closedProjects.value}</div>
                  </Col>
                  <Col xs="auto">
                    {" "}
                    <span className="text-muted me-2">
                      {data.closedProjects.update}
                    </span>
                    <Badge bg="success-light" text="success">
                      <FontAwesomeIcon icon={faArrowUp} className="me-2" />
                      {data.closedProjects.percentage}%
                    </Badge>
                  </Col>
                </Row>
                <Row className=" mt-4 card-text text-sm justify-content-center">
                  {data.closedProjects.legend.map((item) => (
                    <Col xs="auto" key={item.title}>
                      <span
                        className="indicator"
                        style={{ background: item.color }}
                      />
                      <span className="text-gray-500">{item.title}</span>
                      <div className="ms-3 h6">{item.value}</div>
                    </Col>
                  ))}
                </Row>
              </Card.Footer>
            </Card>
          </Col>

          {/* Tickets solved */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card className="h-100">
              <Card.Header>
                <h5 className="card-heading">{data.ticketsSolved.title}</h5>
                <CardHeaderMore />
              </Card.Header>
              <Card.Body>
                <PieChart {...data.ticketsSolved.chart} />
              </Card.Body>
              <Card.Footer className="bg-white">
                <h3 className="subtitle text-gray-500 fw-normal text-center">
                  {data.ticketsSolved.subtitle}
                </h3>
                <Row className="justify-content-center align-items-center">
                  <Col xs="auto">
                    <div className="h4 mb-0">{data.ticketsSolved.value}</div>
                  </Col>
                  <Col xs="auto">
                    {" "}
                    <span className="text-muted me-2">
                      {data.ticketsSolved.update}
                    </span>
                    <Badge bg="danger-light" text="danger">
                      <FontAwesomeIcon icon={faArrowDown} className="me-2" />
                      {data.ticketsSolved.percentage}%
                    </Badge>
                  </Col>
                </Row>
                <Row className=" mt-4 card-text text-sm justify-content-center">
                  {data.ticketsSolved.legend.map((item) => (
                    <Col xs="auto" key={item.title}>
                      <span
                        className="indicator"
                        style={{ background: item.color }}
                      />
                      <span className="text-gray-500">{item.title}</span>
                      <div className="ms-3 h6">{item.value}</div>
                    </Col>
                  ))}
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
