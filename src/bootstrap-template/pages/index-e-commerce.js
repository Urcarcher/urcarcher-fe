import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ButtonGroup,
  Button,
} from "react-bootstrap"

import data from "../data/index.json"

import widgetsStats from "../data/widgets-stats.json"

import Stats14 from "../components/Widgets/Stats14"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import Icon from "../components/Icon"
import BarChart2 from "../components/charts/BarChart2"
import Activity from "../components/Activity"
import Bestsellers from "../components/Bestsellers"
import Orders from "../components/Orders"
export async function getStaticProps() {
  return {
    props: {
      title: "Bubbly",
    },
  }
}
export default function IndexEcommerce() {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <div className="page-header d-flex justify-content-between align-items-center">
        <h1 className="page-heading">E-commerce Dashboard</h1>
      </div>
      <section className="mb-3 mb-lg-5">
        {/* Top Widgets */}
        <Card className="mb-5">
          <Card.Body>
            <Row className="g-5">
              {widgetsStats.group8.map((item, index) => (
                <Col sm={6} xl={3} key={index}>
                  <Stats14 {...item} />
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        {/* Sales By Channel */}
        <Card className="mb-5">
          <Card.Header className="bg-inverse">
            <Row className="align-items-center">
              <Col>
                <h5 className="card-heading">Sales by channel</h5>
              </Col>
              <Col xs="auto">
                <ButtonGroup>
                  <Button
                    size="sm"
                    variant="outline-light"
                    className="active"
                    href="#!"
                    aria-current="page"
                  >
                    This week
                  </Button>
                  <Button size="sm" variant="outline-light" href="#!">
                    Last week
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row className="mb-5 align-items-center">
              <Col>
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
              <Col xs="auto">
                <div className="icon icon-xl ms-2 bg-primary-light">
                  <Icon className="text-primary" icon="pay-1" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={9} xl={10}>
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
              </Col>
              <Col
                xl={2}
                lg={3}
                className="text-end border-start d-flex flex-column justify-content-between py-lg-3 py-xxl-5"
              >
                <div>
                  <h3 className="subtitle text-gray-500 fw-normal">
                    Organic Search Revenue
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
                <hr className="bg-gray-500" />
                <div>
                  <h3 className="subtitle text-gray-500 fw-normal">
                    Facebook Ads Revenue
                  </h3>
                  <div className="h4 fw-normal text-dark">$2,500</div>
                  <p className="mb-0">
                    <span className="text-muted me-2">-$233 </span>
                    <Badge bg="danger-light" text="danger">
                      <FontAwesomeIcon icon={faArrowDown} className="me-2" />
                      -2.1%
                    </Badge>
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Row>
          <Col lg={4}>
            {/* Latest Activity */}
            <div className="card-adjust-height-lg">
              <Activity />
            </div>
          </Col>
          <Col lg={8}>
            {/* Bestsellers */}
            <Bestsellers />
          </Col>
        </Row>

        {/* Latest Orders */}
        <Orders header="Latest Orders" />
      </section>
    </Container>
  )
}
