import { Fragment } from "react"
import { Col, Container, Row, Card } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import CardMain from "../components/cards/CardMain"
import CardOverlay from "../components/cards/CardOverlay"
import PageHeader from "../components/PageHeader"

import data from "../data/cards.json"

export async function getStaticProps() {
  return {
    props: {
      title: "Cards",
    },
  }
}
export default function ComponentsCards(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        {data.map((block, index) => (
          <Fragment key={index}>
            {block.name && <h4 className="mt-5 mb-4">{block.name}</h4>}
            <Row>
              {!block.group ? (
                block.cards.map((item, subIndex) => (
                  <Col
                    md={6}
                    lg={!item.nav && (index === 0 ? 3 : 4)}
                    key={subIndex}
                  >
                    {!item.overlay ? (
                      <CardMain {...item} />
                    ) : (
                      <CardOverlay {...item} />
                    )}
                  </Col>
                ))
              ) : (
                <Col xs={12}>
                  <div className="card-group mb-4">
                    {block.cards.map((item, index) => (
                      <CardMain {...item} key={index} />
                    ))}
                  </div>
                </Col>
              )}
            </Row>
          </Fragment>
        ))}
        <Card className="mb-4">
          <Card.Header>
            <h5>Mockups Used here</h5>
          </Card.Header>
          <Card.Body>
            <ul>
              <li>
                <a href="https://dribbble.com/shots/2862026-Beauty-Cosmetics-Stationery-Wedding">
                  https://dribbble.com/shots/2862026-Beauty-Cosmetics-Stationery-Wedding
                </a>
              </li>
              <li>
                <a href="https://dribbble.com/shots/1155962-Free-Stationery-Mockup-PSD">
                  https://dribbble.com/shots/1155962-Free-Stationery-Mockup-PSD
                </a>
              </li>
              <li>
                <a href="https://dribbble.com/shots/2569937-Brandminute-Scene-02">
                  https://dribbble.com/shots/2569937-Brandminute-Scene-02
                </a>
              </li>
              <li>
                <a href="https://dribbble.com/shots/1468064-Another-Branding-Mock-Up-Free-PSD">
                  https://dribbble.com/shots/1468064-Another-Branding-Mock-Up-Free-PSD
                </a>
              </li>
              <li>
                <a href="https://dribbble.com/shots/3684230-Letterhead-Mockup">
                  https://dribbble.com/shots/3684230-Letterhead-Mockup
                </a>
              </li>
              <li>
                <a href="https://dribbble.com/shots/2584869-Brandminute-Scene-07">
                  https://dribbble.com/shots/2584869-Brandminute-Scene-07
                </a>
              </li>
            </ul>
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}
