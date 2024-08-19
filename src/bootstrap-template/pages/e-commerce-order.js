import {
  faCalendar,
  faDownload,
  faPlusCircle,
  faPrint,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  Card,
  Container,
  Badge,
  Dropdown,
  Row,
  Col,
  Table,
} from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import CardHeaderMore from "../components/CardHeaderMore"
import CustomImage from "../components/CustomImage"
export async function getStaticProps() {
  return {
    props: {
      title: "Order #25646",
    },
  }
}
export default function ECommerceOrder(props) {
  const products = [
    {
      img: "/img/product/product-1.jpg",
      name: "Round grey hanging decor",
      attributes: [
        {
          name: "size",
          value: "M",
        },
      ],
      quantity: 1,
      price: 22,
    },
    {
      img: "/img/product/product-2.jpg",
      name: "Silver black round Ipod",
      quantity: 2,
      price: 25,
    },
    {
      img: "/img/product/product-3.jpg",
      name: "Round grey hanging decor",
      quantity: 3,
      price: 11,
    },
    {
      img: "/img/product/product-4.jpg",
      name: "Sony PS 4 game controller",
      quantity: 1,
      price: 43,
    },
  ]

  const total = products.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  )

  const shipping = 5
  const fee = 7

  const address = {
    name: "John Brown",
    address: "13/25 New Avenue",
    city: "New Heaven",
    zip: "45Y 73J",
    state: "England",
    country: "Great Britain",
    countryCode: "gb",
  }
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs
        title={props.title}
        pages={[{ name: "Orders", link: "/e-commerce-orders" }]}
      />
      <div className="page-header  d-md-flex justify-content-between">
        <div>
          <h1 className="page-heading">{props.title}</h1>
          <ul className="list-inline text-sm">
            <li className="list-inline-item">
              <a className="text-gray-600" href="#!">
                <FontAwesomeIcon icon={faDownload} className="me-2" />
                Export
              </a>
            </li>
            <li className="list-inline-item">
              <a className="text-gray-600" href="#!">
                <FontAwesomeIcon icon={faPrint} className="me-2" />
                Print
              </a>
            </li>
            <li className="list-inline-item">
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  className="text-gray-600"
                >
                  <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                  More actions
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#!" className="text-muted">
                    Action
                  </Dropdown.Item>
                  <Dropdown.Item href="#!" className="text-muted">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#!" className="text-muted">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
        <div className="mt-2">
          <p className="mb-2">
            <Badge
              bg="success-light"
              text="success"
              className="text-base me-2 mb-2"
            >
              <span className="indicator" />
              Paid
            </Badge>
            <Badge bg="warning-light" text="warning" className="text-base">
              <span className="indicator" />
              Being Processed
            </Badge>
          </p>
          <p className="text-end text-muted text-sm">
            <FontAwesomeIcon icon={faCalendar} className="me-2" />
            Jun 22, 2021 — 10:25 AM
          </p>
        </div>
      </div>
      <Row className="mb-5">
        <Col lg={8}>
          <Card className="card-table mb-4">
            <Card.Header>
              <h5 className="card-heading"> Order details</h5>
              <CardHeaderMore />
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table hover borderless className="mb-0">
                  <thead className="light">
                    <tr>
                      <th style={{ minWidth: "300px" }}>Product</th>
                      <th>Items</th>
                      <th>Price</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr className="align-middle" key={index}>
                        <td className="d-flex align-items-center">
                          <div className="card-table-img  me-3">
                            <CustomImage
                              className="img-fluid"
                              src={product.img}
                              alt={product.name}
                              layout="responsive"
                              width={80}
                              height={88}
                            />
                          </div>
                          <span className="card-table-text">
                            <a
                              className="text-reset text-decoration-none"
                              href="#!"
                            >
                              <strong>{product.name}</strong>
                              <br />

                              {product.attributes &&
                                product.attributes.map((attribute, index) => (
                                  <span className="text-muted" key={index}>
                                    {attribute.name}: {attribute.value}
                                  </span>
                                ))}
                            </a>
                          </span>
                        </td>
                        <td>{product.quantity}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td className="text-end">
                          ${(product.price * product.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
          <Row className="gy-4">
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <h5 className="card-heading"> Invoice address</h5>
                  <CardHeaderMore />
                </Card.Header>
                <Card.Body>
                  <Card.Text className="card-text text-muted">
                    {address.name}
                    <br />
                    {address.address}
                    <br />
                    {address.city}
                    <br />
                    {address.zip}
                    <br />
                    {address.state}
                    <br />
                    <strong>{address.country}</strong>
                    <span
                      className="ms-2 align-middle mt-n1 avatar avatar-xxs bg-cover"
                      style={{
                        backgroundImage: `url(img/flag/${address.countryCode}.svg)`,
                      }}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} className="mb-4">
              <Card>
                <Card.Header>
                  <h5 className="card-heading"> Shipping address</h5>
                  <CardHeaderMore />
                </Card.Header>
                <Card.Body>
                  <Card.Text className="card-text text-muted">
                    {address.name}
                    <br />
                    {address.address}
                    <br />
                    {address.city}
                    <br />
                    {address.zip}
                    <br />
                    {address.state}
                    <br />
                    <strong>{address.country}</strong>
                    <span
                      className="ms-2 align-middle mt-n1 avatar avatar-xxs bg-cover"
                      style={{
                        backgroundImage: `url(img/flag/${address.countryCode}.svg)`,
                      }}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={4}>
          <Card className="card-table">
            <Card.Header>
              <h5 className="card-heading"> Order details</h5>
              <CardHeaderMore />
            </Card.Header>
            <Card.Body>
              <div className="table-responsive my-3">
                <Table className="table table-borderless card-text">
                  <tbody>
                    <tr className="text-muted">
                      <th className="fw-normal">Products</th>
                      <td className="text-end">${total.toFixed(2)}</td>
                    </tr>
                    <tr className="text-muted">
                      <th className="fw-normal">Shipping Fee</th>
                      <td className="text-end">${shipping.toFixed(2)}</td>
                    </tr>
                    <tr className="text-muted">
                      <th className="fw-normal">Sales Tax</th>
                      <td className="text-end">${fee.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td className="text-end">
                        ${(total + shipping + fee).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
