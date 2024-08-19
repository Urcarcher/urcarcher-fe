import { Card, Col, Container, Row } from "react-bootstrap"

import Breadcrumbs from "../components/Breadcrumbs"
import PageHeader from "../components/PageHeader"

import data from "../data/widgets-stats.json"
import Stats1 from "../components/Widgets/Stats1"
import Stats2 from "../components/Widgets/Stats2"
import Stats3 from "../components/Widgets/Stats3"
import Stats4 from "../components/Widgets/Stats4"
import Stats5 from "../components/Widgets/Stats5"
import Stats6 from "../components/Widgets/Stats6"
import Stats7 from "../components/Widgets/Stats7"
import Stats8 from "../components/Widgets/Stats8"
import Stats9 from "../components/Widgets/Stats9"
import Stats10 from "../components/Widgets/Stats10"
import Stats11 from "../components/Widgets/Stats11"
import Stats12 from "../components/Widgets/Stats12"
import Stats13 from "../components/Widgets/Stats13"
import Stats14 from "../components/Widgets/Stats14"
export async function getStaticProps() {
  return {
    props: {
      title: "Stats Widgets",
    },
  }
}

export default function WidgetsStats(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Row className="mb-5">
          {data.group1.map((item, index) => (
            <Col sm={6} lg={3} key={index} className="mb-4">
              {/* First stats widget */}
              <Stats1 {...item} />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          {data.group2.map((item, index) => (
            <Col sm={6} md={4} key={index} className="mb-4">
              {/* Second stats widget */}
              <Stats2 {...item} />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          {data.group3.map((item, index) => (
            <Col sm={6} md={3} key={index} className="mb-4">
              {/* Third stats widget */}
              <Stats3 {...item} />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          {data.group4.map((item, index) => (
            <Col sm={6} md={4} key={index} className="mb-4">
              {/* Fourth stats widget */}
              <Stats4 {...item} />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          {data.group5.map((item, index) => (
            <Col md={6} key={index} className="mb-4">
              {/* Fifth stats widget */}
              <Stats5 {...item} />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            {/* Sixth stats widget */}
            <Stats6 {...data.stats6} />
          </Col>
          <Col md={6} className="mb-4">
            {/* Seventh stats widget */}
            <Stats7 data={data.stats7} />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md={6} lg={3} className="mb-4">
            {/* Eigth stats widget */}
            <Stats8 {...data.stats8} />
          </Col>
          <Col md={6} lg={3} className="mb-4">
            {/* Eigth stats widget with icon */}
            <Stats8 {...data.stats8icon} />
          </Col>
          <Col lg={6} className="mb-4">
            {/* Ninth stats widget */}
            <Stats9 {...data.stats9} />
          </Col>
        </Row>
        <Row className="mb-5">
          {data.group6.map((item, index) => (
            <Col md={4} className="mb-4" key={index}>
              {/* Tenth stats widget */}
              <Stats10 {...item} />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          {data.group7.map((item, index) => (
            <Col md={6} xl={3} className="mb-4" key={index}>
              {/* Eleventh stats widget */}
              <Stats11 {...item} />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          {data.group9.map((item, index) => (
            <Col md={6} xl={3} className="mb-4" key={index}>
              {/* Eleventh stats widget */}
              <Stats11 {...item} />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          {data.group7.map((item, index) => (
            <Col md={6} xl={3} className="mb-4" key={index}>
              {/* Twelfth stats widget */}
              <Stats12 {...item} />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          {data.group7.map((item, index) => (
            <Col md={6} xl={3} className="mb-4" key={index}>
              {/* Thirteenth stats widget */}
              <Stats13 {...item} />
            </Col>
          ))}
        </Row>
        <div className="pb-5">
          <Card className="mb-4">
            <Card.Body>
              <Row className="g-5">
                {data.group8.map((item, index) => (
                  <Col md={6} xl={3} key={index}>
                    {/* Fourteenth stats widget */}
                    <Stats14 {...item} />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </div>
      </section>
    </Container>
  )
}
