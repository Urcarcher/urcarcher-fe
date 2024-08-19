import {
  faServer,
  faDollyFlatbed,
  faReceipt,
  faClipboardCheck,
  faDollarSign,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons"
import { faClipboard } from "@fortawesome/free-regular-svg-icons"

import { Container, Row, Col, Card } from "react-bootstrap"

import data from "../data/index-charts.json"
import DonutChart from "../components/charts/DonutChart"
import LineChart from "../components/charts/LineChart"
import BankCards from "../components/BankCards"
import Transactions from "../components/Transactions"
import Pill from "../components/Pill"
import Avatar from "../components/Avatar"

export async function getStaticProps() {
  return {
    props: {
      title: "Bubbly",
    },
  }
}
export default function IndexCharts() {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      {data.top && (
        <section className="mb-3 mb-lg-5">
          <Row>
            {data.top.map((item, index) => {
              let color
              let icon
              switch (item.type) {
                case "open-cases":
                  color = "green"
                  icon = faClipboard
                  break
                case "work-orders":
                  color = "blue"
                  icon = faDollyFlatbed
                  break
                case "new-invoices":
                  color = "red"
                  icon = faReceipt
                  break
                default:
                  color = "indigo"
                  icon = faServer
              }

              return (
                <Col xl={3} md={6} className="mb-4" key={index}>
                  <Pill data={item} icon={icon} color={color} fullHeight />
                </Col>
              )
            })}
          </Row>
        </section>
      )}
      {data.block1 && (
        <section className="mb-4 mb-lg-5">
          <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">
            {data.block1.name}
          </h2>
          <Row>
            <Col lg={7} className="mb-4 mb-lg-0">
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
            <Col lg={5} className="mb-4 mb-lg-0">
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
        </section>
      )}
      {data.block2 && (
        <section className="mb-4 mb-lg-5">
          <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">
            {data.block2.name}
          </h2>
          <Row>
            <Col lg={5} className="mb-4 mb-lg-0">
              {data.block2.graphs.regular.map((graph, index) => (
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
            <Col lg={7}>
              <Card className="h-100">
                <Card.Header>
                  <h4 className="card-heading">
                    {data.block2.graphs.main.name}
                  </h4>
                </Card.Header>
                <Card.Body>
                  <div className="chart-holder">
                    {data.block2.graphs.main.type === "line" ? (
                      <LineChart
                        className="w-100"
                        {...data.block2.graphs.main.data}
                      />
                    ) : (
                      <DonutChart
                        color={data.block2.graphs.main.color}
                        {...data.block2.graphs.main.data}
                      />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      )}

      {data.cards && <BankCards data={data.cards} />}

      {data.updates && (
        <section className="mb-4 mb-lg-5">
          <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">
            {data.updates.name}
          </h2>
          <Row>
            <Col lg="7" xl="6" className="mb-5 mb-lg-0">
              <Transactions
                data={data.updates.transactions}
                className="h-100"
              />
            </Col>
            <Col lg="5" xl="6">
              <Row className="h-100">
                {data.updates.notifications.map((notification, index) => {
                  let color
                  let icon
                  switch (notification.type) {
                    case "quotes":
                      color = "green"
                      icon = faDollarSign
                      break
                    case "clients":
                      color = "blue"
                      icon = faUserFriends
                      break

                    default:
                      color = "indigo"
                      icon = faClipboardCheck
                  }

                  return (
                    <Col xxl="6" key={index}>
                      <Pill
                        data={notification}
                        icon={icon}
                        color={color}
                        className="mb-4"
                      />
                    </Col>
                  )
                })}
                <Col xs="12" xxl={{ span: 12, order: 1 }}>
                  <Card className="h-100">
                    <Card.Body>
                      <h2 className="mb-0 d-flex align-items-center">
                        <span>86.4</span>
                        <span className="dot bg-red d-inline-block ms-3"></span>
                      </h2>
                      <span className="text-muted">Daily Profile Visitors</span>
                      <div className="chart-holder">
                        <LineChart
                          {...data.updates.graph.data}
                          className="w-100"
                        />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
      )}
      {data.people && (
        <section className="mb-4">
          <h2 className="section-heading section-heading-ms mb-4 mb-lg-5">
            {data.people.name}
          </h2>
          <Row>
            {data.people.items.map((item, index) => (
              <Col sm={6} xl={12} key={index}>
                <a href="#" className="text-decoration-none text-reset">
                  <Card className="messag px-5 py-3 mb-4 bg-hover-gradient-primary ">
                    <Row>
                      <Col
                        xl={3}
                        className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left"
                      >
                        <strong className="h5 mb-0">
                          {item.date[0]}
                          <sup className="text-xs text-gray-500 font-weight-normal ms-1">
                            {item.date[1]}
                          </sup>
                        </strong>
                        <div className="mx-3">
                          <Avatar
                            image={item.img}
                            alt={item.name}
                            className="my-2 my-xl-0"
                            border
                          />
                        </div>

                        <h6 className="mb-0">{item.name}</h6>
                      </Col>
                      <Col
                        xl={9}
                        className="d-flex align-items-center flex-column flex-xl-row text-center text-md-left"
                      >
                        <div className="bg-gray-200 rounded-pill px-4 py-1 me-0 me-xl-3 mt-2 mt-xl-0 text-sm text-dark exclude">
                          {item.type}
                        </div>
                        <p className="mb-0 mt-3 mt-lg-0">{item.content}</p>
                      </Col>
                    </Row>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </Container>
  )
}
