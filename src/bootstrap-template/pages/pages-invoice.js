import PageHeader from "../components/PageHeader"
import Breadcrumbs from "../components/Breadcrumbs"
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Badge,
  Table,
} from "react-bootstrap"
import data from "../data/invoice.json"

import Image from "../components/CustomImage"
export async function getStaticProps() {
  return {
    props: {
      title: "Invoice",
    },
  }
}
export default function PagesInvoice(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />

      <section>
        <Row className="mb-5">
          <Col sm={6} className="d-sm-flex align-items-center">
            <h2 className="h4 display mb-4 mb-sm-0"> Invoice #{data.id}</h2>
          </Col>
          <Col sm={6}>
            <p className="text-sm-end mb-0">
              <Button variant="outline-secondary" className="mb-2 mb-sm-0">
                Download
              </Button>
              <Button variant="primary" className="mb-2 mb-sm-0 ml-1 ms-2">
                Pay
              </Button>
            </p>
          </Col>
        </Row>
        <Card className="p-5 mb-5">
          <Card.Body>
            {data.overdue && (
              <Row>
                <Col className="text-end">
                  <Badge bg="danger">Overdue</Badge>
                </Col>
              </Row>
            )}
            <div className="text-center mb-5">
              <div className="mb-4">
                <Image
                  src="/img/brand/brand-1.svg"
                  layout="fixed"
                  width={96}
                  height={96}
                  alt="..."
                  style={{ maxWidth: "6rem" }}
                />
              </div>
              <h2 className="mb-2">Invoice from Vintage, Ltd.</h2>
              <p className="text-muted">Invoice #{data.id}</p>
            </div>
            <Row>
              <Col xs={12} md={6}>
                <h6 className="text-uppercase text-muted">Invoiced from</h6>
                <p className="text-muted mb-4">
                  <strong className="text-body">Franz Kafka</strong>
                  <br /> Bank Clerk
                  <br /> Nerudova 23
                  <br />
                  111 50 Praha
                </p>
                <h6 className="text-uppercase text-muted">Invoiced ID</h6>
                <p className="mb-4">#{data.id}</p>
              </Col>
              <Col xs={12} md={6} className="text-md-right">
                <h6 className="text-uppercase text-muted">Invoiced to</h6>
                <p className="text-muted mb-4">
                  <strong className="text-body">{data.to.name}</strong>
                  <br />
                  {data.to.position}
                  <br />
                  {data.to.street}
                  <br />
                  {data.to.town}
                </p>
                <h6 className="text-uppercase text-muted">Due date</h6>
                <p className="mb-4">
                  <time dateTime="2018-04-23">{data.dueDate}</time>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Table responsive className="my-4">
                  <thead>
                    <tr>
                      <th className="px-0 bg-transparent border-top-0">
                        <span className="h6">Description</span>
                      </th>
                      <th className="px-0 bg-transparent border-top-0">
                        <span className="h6">Hours</span>
                      </th>
                      <th className="px-0 bg-transparent border-top-0 text-end">
                        <span className="h6">Cost</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.work.map((item, index) => (
                      <tr key={index}>
                        <td className="px-0">{item.name}</td>
                        <td className="px-0">{item.hours}</td>
                        <td className="px-0 text-end">
                          ${item.hours * data.hourRate}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="px-0 border-top">
                        <strong>Total amount due</strong>
                      </td>
                      <td className="px-0 text-end border-top" colSpan="2">
                        <span className="h3">
                          $
                          {data.work.reduce((a, b) => a + b.hours, 0) *
                            data.hourRate}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <hr className="my-5" />
                <h6 className="text-uppercase">Note</h6>
                <p className="text-muted text-sm mb-0">{data.note}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>
    </Container>
  )
}
