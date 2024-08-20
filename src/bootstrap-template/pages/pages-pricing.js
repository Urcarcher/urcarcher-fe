import { Card, Container, Row, Col, Button } from "react-bootstrap"
import PageHeader from "../components/PageHeader"
import Breadcrumbs from "../components/Breadcrumbs"

import data from "../data/pricing.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      title: "Pricing tables",
    },
  }
}

export default function PagesPricing(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />

      <section>
        <Row className="mb-5">
          {data.pricing.map((item) => (
            <Col lg={4} key={item.name}>
              <Card
                className={`mb-5 mb-lg-0 border-0  ${
                  item.featured
                    ? "card-highlight shadow-lg overflow-hidden"
                    : "shadow"
                }`}
              >
                {item.featured && <div className="card-status bg-primary" />}
                <Card.Body>
                  <h2 className="card-heading text-primary text-center fw-bold py-3">
                    {item.name}
                  </h2>
                  <p className="text-muted text-center mb-4">
                    <span className="h1 text-dark fw-bold">${item.price}</span>
                    <span className="ms-2">/ month</span>
                  </p>
                  <hr className="text-muted" />
                  <ul className="fa-ul my-4">
                    {item.features.map((feature) => (
                      <li className="mb-3" key={feature.name}>
                        <span
                          className={`fa-li ${
                            feature.disabled ? "text-muted" : "text-primary"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={feature.disabled ? faTimes : faCheck}
                          />
                        </span>
                        {feature.name}
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <Button variant="outline-primary" href="#">
                      Select
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  )
}
