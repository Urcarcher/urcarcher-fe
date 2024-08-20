import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import { faDownload, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Card, Container, Tabs, Tab, Badge, Button } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import products from "../data/products.json"
import DataTable from "../components/DataTable"
import Image from "../components/CustomImage"
import useWindowSize from "../hooks/useWindowSize"
export async function getStaticProps() {
  return {
    props: {
      title: "Products",
    },
  }
}
export default function ECommerceCustomers(props) {
  const [activeTab, setActiveTab] = useState("allProducts")
  const [hiddenColumns, setHiddenColumns] = useState([])
  const columns = React.useMemo(
    () => [
      {
        Header: "Product ID",
        accessor: "product_id",
        Cell: ({ row: { index } }) => {
          return `#${2568 + index++}`
        },
      },
      {
        Header: "Name",
        accessor: "title",
        Cell: ({ cell: { value }, row: { original, index } }) => {
          return (
            <Link href="/e-commerce-product-new">
              <a className="text-reset text-decoration-none d-flex align-items-center">
                <div className="card-table-img me-3 d-none d-lg-block">
                  <Image
                    className=" img-fluid"
                    src={original.img}
                    alt={value}
                    layout="fixed"
                    width={70}
                    height={80}
                    objectFit="cover"
                  />
                </div>
                <strong>{value}</strong>
              </a>
            </Link>
          )
        },
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "In Stock",
        accessor: "in_stock",
        Cell: ({ row: { index } }) => {
          // Demo purposes only - use real stock data
          return 43 + index++
        },
      },
      {
        Header: "Last ordered",
        accessor: "last_ordered",
        Cell: ({ row: { index } }) => {
          // Demo purposes only - use real data
          const month = Math.floor(Math.random() * 12 + 1)
            .toString()
            .padStart(2, "0")
          const day = Math.floor(Math.random() * 31 + 1)
            .toString()
            .padStart(2, "0")
          return `2021/${month}/${day}`
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row: { original } }) => {
          return (
            <React.Fragment>
              {original.new && (
                <Badge bg="primary-light" text="primary">
                  New Arrival
                </Badge>
              )}
              {original.hot && (
                <Badge bg="success-light" text="success">
                  Hot
                </Badge>
              )}
              {original.trending && (
                <Badge bg="info-light" text="info">
                  Hot
                </Badge>
              )}

              {original.soldout && (
                <Badge bg="danger-light" text="danger">
                  Soldout
                </Badge>
              )}
            </React.Fragment>
          )
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row: { original } }) => {
          return (
            <div>
              <Link href="/e-commerce-product-new">
                <a className="me-3 text-lg text-success">
                  <FontAwesomeIcon icon={faEdit} />
                </a>
              </Link>
              <a className="text-lg text-danger" href="#!">
                <FontAwesomeIcon icon={faTrashAlt} />
              </a>
            </div>
          )
        },
      },
    ],
    [hiddenColumns]
  )

  const viewportSize = useWindowSize()
  useEffect(() => {
    if (viewportSize.width < 600) {
      setHiddenColumns(["title", "last_ordered", "status", "in_stock"])
    } else if (viewportSize.width < 900) {
      setHiddenColumns(["last_ordered"])
    } else {
      setHiddenColumns([])
    }
  }, [viewportSize.width])
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
        <div>
          <Link href="/e-commerce-product-new" passHref>
            <Button variant="primary" className="text-uppercase">
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Add new
            </Button>
          </Link>
        </div>
      </div>

      <section className="mb-5">
        <Tabs
          activeKey={activeTab}
          onSelect={(eventKey) => setActiveTab(eventKey)}
          className="mb-5"
        >
          <Tab eventKey="allProducts" title="All Products">
            {/* PRODUCTS TABLE */}
            <Card className="card-table mb-4">
              <Card.Body>
                <DataTable
                  items={products}
                  columns={columns}
                  defaultPageSize={10}
                  hiddenColumns={hiddenColumns}
                />
              </Card.Body>
            </Card>
            {/* END PRODUCTS TABLE */}
          </Tab>
          <Tab eventKey="archived" title="Archived"></Tab>
          <Tab eventKey="drafts" title="Drafts"></Tab>
          <Tab eventKey="outOfStock" title="Out of Stock"></Tab>
        </Tabs>
      </section>
    </Container>
  )
}
