import PageHeader from "../components/PageHeader"
import Breadcrumbs from "../components/Breadcrumbs"
import { Card, Container, Row, Col } from "react-bootstrap"
import data from "../data/contacts.json"

import Link from "next/link"
import Avatar from "../components/Avatar"
export async function getStaticProps() {
  return {
    props: {
      title: "Contacts",
    },
  }
}
export default function PagesContacts(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />

      <section>
        <Row>
          {data.contacts.map((contact) => (
            <Col md={6} xl={4} key={contact.name}>
              <Card className="mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <Avatar
                        image={contact.img}
                        alt={contact.name}
                        size="lg"
                        border
                        priority
                      />
                    </div>
                    <div className="flex-grow-1 ps-3 overflow-hidden">
                      <h5 className="card-text mb-0">{contact.name}</h5>
                      <p className="card-text text-uppercase text-muted">
                        {contact.description}
                      </p>
                      <p className="card-text">
                        {contact.email}
                        <br />
                        <abbr title="Phone">P: </abbr>
                        {contact.phone}
                      </p>
                    </div>
                  </div>
                  <Link href="/pages-profile">
                    <a className="stretched-link" />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  )
}
