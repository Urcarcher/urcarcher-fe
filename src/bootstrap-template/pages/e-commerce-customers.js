import { Card, Container, Badge, Form } from "react-bootstrap"
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Breadcrumbs from "../components/Breadcrumbs"
import data from "../data/tables-datatable.json"
import Avatar from "../components/Avatar"
import DataTable from "../components/DataTable"
import React from "react"
export async function getStaticProps() {
  return {
    props: {
      title: "Customers",
    },
  }
}
export default function ECommerceCustomers(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Customer",
        accessor: "person",
        Cell: ({ cell: { value }, row: { index } }) => {
          // Only for demo purposes - use real avatar on production
          const avatarIndex = index % 11
          const avatarColorVariant =
            index % 2 ? "warning-light" : "primary-light"
          return (
            <div
              style={{ minWidth: "250px" }}
              className="text-dark text-base d-flex align-items-center"
            >
              <Form.Check type="checkbox" className="d-inline-block me-2" />
              <a
                className="text-reset text-decoration-none  d-flex align-items-center"
                href="#!"
              >
                {avatarIndex % 3 == 0 ? (
                  <Avatar
                    text={value.substr(0, 1)}
                    variant={avatarColorVariant}
                    className="avatar me-2"
                    style={{ padding: ".25rem" }}
                  />
                ) : (
                  <Avatar
                    image={`/img/avatar-${avatarIndex}.jpg`}
                    alt={value}
                    priority
                    className="me-2"
                    border
                  />
                )}
                <strong>{value}</strong>
              </a>
            </div>
          )
        },
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Status",
        accessor: "isActive",
        sortType: "basic",
        Cell: ({ cell: { value } }) => {
          return value ? (
            <Badge bg="success-light" text="success">
              Active
            </Badge>
          ) : (
            <Badge bg="danger-light" text="danger">
              Inactive
            </Badge>
          )
        },
      },
      {
        Header: "Orders",
        accessor: "orders",
        Cell: ({ cell: { value } }) => {
          return value
        },
      },
      {
        Header: "Spent",
        accessor: "price",
        Cell: ({ cell: { value } }) => {
          // Only for demo purposes - use real prices on production
          const price =
            Math.floor(Math.random() * 90 + 1) + Math.random().toFixed(2)
          return `$${price}`
        },
      },
    ],
    []
  )
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <div className="page-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="page-heading">{props.title}</h1>
          <ul className="list-inline text-sm">
            <li className="list-inline-item">
              <a className="text-gray-600" href="#!">
                <FontAwesomeIcon icon={faUpload} className="me-2" />
                Import
              </a>
            </li>
            <li className="list-inline-item">
              <a className="text-gray-600" href="#!">
                <FontAwesomeIcon icon={faDownload} className="me-2" /> Export
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Card className="card-table mb-4">
        <Card.Body>
          <DataTable items={data} columns={columns} defaultPageSize={10} />
        </Card.Body>
      </Card>
    </Container>
  )
}
