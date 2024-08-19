import { Card, Col, Container, Row, Table } from "react-bootstrap"

import Breadcrumbs from "../components/Breadcrumbs"
import PageHeader from "../components/PageHeader"
export async function getStaticProps() {
  return {
    props: {
      title: "Tables",
    },
  }
}
export default function Tables(props) {
  const tableData = [
    {
      name: "Nielsen Cobb",
      company: "Memora",
      email: "nielsencobb@memora.com",
    },
    {
      name: "Margret Cote",
      company: "Zilidium",
      email: "margretcote@zilidium.com",
    },
    {
      name: "Rachel Vinson",
      company: "Chorizon",
      email: "rachelvinson@chorizon.com",
    },
    {
      name: "Gabrielle Aguirre",
      company: "Comverges",
      email: "gabrielleaguirre@comverges.com",
    },
    {
      name: "Spears Collier",
      company: "Remold",
      email: "spearscollier@remold.com",
    },
  ]
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Row>
          <Col lg={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading">Basic Table</h4>
              </Card.Header>
              <Card.Body>
                <Table responsive className="card-text">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.slice(0, 3).map((tableRow, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{tableRow.name}</td>
                        <td>{tableRow.company}</td>
                        <td>{tableRow.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading">Striped Table</h4>
              </Card.Header>
              <Card.Body>
                <Table striped responsive className="card-text">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.slice(0, 3).map((tableRow, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{tableRow.name}</td>
                        <td>{tableRow.company}</td>
                        <td>{tableRow.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading">
                  Striped table with hover effect
                </h4>
              </Card.Header>
              <Card.Body>
                <Table responsive striped hover className="card-text">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.slice(0, 3).map((tableRow, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{tableRow.name}</td>
                        <td>{tableRow.company}</td>
                        <td>{tableRow.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading">Compact Table</h4>
              </Card.Header>
              <Card.Body>
                <Table responsive striped size="sm" className="card-text">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((tableRow, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{tableRow.name}</td>
                        <td>{tableRow.company}</td>
                        <td>{tableRow.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
