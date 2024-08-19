import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import DataTable from "../components/DataTable"
import PageHeader from "../components/PageHeader"

import data from "../data/cms-category.json"
import useWindowSize from "../hooks/useWindowSize"

export async function getStaticProps() {
  return {
    props: {
      title: "Categories",
    },
  }
}
export default function CmsCategory(props) {
  const [hiddenColumns, setHiddenColumns] = useState([])
  const columns = React.useMemo(
    () => [
      {
        accessor: "select",
        Cell: () => {
          return <Form.Check type="checkbox" />
        },
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell: { value } }) => {
          return (
            <Link href="/cms-post">
              <a className="text-decoration-none text-reset fw-bolder">
                {value}
              </a>
            </Link>
          )
        },
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ cell: { value } }) => {
          return `-`
        },
      },
      {
        Header: "Slug",
        accessor: "slug",
      },
      {
        Header: "Count",
        accessor: "count",
        Cell: ({ cell: { value } }) => {
          return (
            <div className="text-end">
              <Link href="/cms-post">
                <a className="text-decoration-none">{value}</a>
              </Link>
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
      setHiddenColumns(["description", "slug", "count"])
    } else if (viewportSize.width < 900) {
      setHiddenColumns(["count"])
    } else {
      setHiddenColumns([])
    }
  }, [viewportSize.width])
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <PageHeader title={props.title} />
      <section>
        <Row className="mb-5">
          <Col lg={4}>
            <Card className="mb-4 mb-lg-0">
              <Card.Body>
                <div className="mb-4">
                  <Form.Label htmlFor="categoryName">Name</Form.Label>
                  <Form.Control
                    id="categoryName"
                    type="text"
                    className="mb-2"
                  />
                  <Form.Text>
                    The name is how it appears on your site.
                  </Form.Text>
                </div>
                <div className="mb-4">
                  <Form.Label htmlFor="categorySlug">Slug</Form.Label>
                  <Form.Control
                    id="categorySlug"
                    type="text"
                    className="mb-2"
                  />
                  <Form.Text>
                    The “slug” is the URL-friendly version of the name. It is
                    usually all lowercase and contains only letters, numbers,
                    and hyphens.
                  </Form.Text>
                </div>
                <div className="mb-4">
                  <Form.Label htmlFor="categoryParent">Parent</Form.Label>
                  <Form.Select
                    id="categoryParent"
                    name="categoryParent"
                    className="mb-2"
                  >
                    <option value="0">None</option>
                    <option value="0">Gear</option>
                    <option value="1">Stories</option>
                    <option value="2">Tips &amp; Tricks</option>
                    <option value="3">Trips</option>
                    <option value="4">Gear</option>
                    <option value="5">Stories</option>
                    <option value="6">Tips &amp; Tricks</option>
                    <option value="7">Trips</option>
                    <option value="8">Uncategorized</option>
                  </Form.Select>
                  <Form.Text>
                    Categories, unlike tags, can have a hierarchy. You might
                    have a Jazz category, and under that have children
                    categories for Bebop and Big Band. Totally optional.
                  </Form.Text>
                </div>
                <div className="mb-4">
                  <Form.Label htmlFor="categoryDescription">
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="categoryDescription"
                    name="categoryDescription"
                    className="mb-2"
                  />
                  <Form.Text>
                    The description is not prominent by default; however, some
                    themes may show it.
                  </Form.Text>
                </div>
                <Button variant="primary" className="mb-4">
                  Add New Category
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="card-table">
              <DataTable
                items={data.categories}
                columns={columns}
                defaultPageSize={10}
                hiddenColumns={hiddenColumns}
              />
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
