import { Card, Container } from "react-bootstrap"

import Breadcrumbs from "../components/Breadcrumbs"
import PageHeader from "../components/PageHeader"

import data from "../data/tables-datatable.json"
import React, { useEffect, useState } from "react"
import ExampleCode from "../components/ExampleCode"
import DataTable from "../components/DataTable"
import useWindowSize from "../hooks/useWindowSize"
export async function getStaticProps() {
  return {
    props: {
      title: "Data Tables",
    },
  }
}
export default function TablesDatatale(props) {
  const [hiddenColumns, setHiddenColumns] = useState([])
  const viewportSize = useWindowSize()
  useEffect(() => {
    if (viewportSize.width < 600) {
      setHiddenColumns(["city", "orders", "phone", "email"])
    } else if (viewportSize.width < 900) {
      setHiddenColumns(["city", "orders"])
    } else {
      setHiddenColumns([])
    }
  }, [viewportSize.width])
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "person",
      },
      {
        Header: "Company",
        accessor: "company",
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
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Orders",
        accessor: "orders",
      },
    ],
    [hiddenColumns]
  )
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Card className="mb-4">
          <Card.Header>
            <h4 className="card-heading">Data Table - Classic</h4>
          </Card.Header>
          <Card.Body className="text-muted">
            <p>Lightweight and extensible data tables for React.</p>
            <p>
              Check out more at{" "}
              <a href="https://react-table.tanstack.com/">Project's website</a>.
            </p>
            <p>
              How easy is it to use React-Table? Take a peek at the code below!
            </p>
            <ExampleCode highlightCode={highlightCode} />
            <br />
            <DataTable
              items={data}
              columns={columns}
              defaultPageSize={10}
              hiddenColumns={hiddenColumns}
            />
          </Card.Body>
        </Card>
        <Card className="card-table mb-4">
          <Card.Header>
            <h4 className="card-heading">Data Table - Card Table</h4>
          </Card.Header>
          <DataTable
            items={data}
            columns={columns}
            defaultPageSize={10}
            hiddenColumns={hiddenColumns}
          />
        </Card>
      </section>
    </Container>
  )
}

const highlightCode = `import DataTable from "../components/DataTable"

export default function page(props) {

  // State for columns to hide
  const [hiddenColumns, setHiddenColumns] = useState([])

  // Viewport size hook
  const viewportSize = useWindowSize()

  // useEffect hook to dynamically hide columns on small screens
  useEffect(() => {
    if (viewportSize.width < 600) {
      setHiddenColumns(["city", "orders", "phone", "email"])
    } else if (viewportSize.width < 900) {
      setHiddenColumns(["city", "orders"])
    } else {
      setHiddenColumns([])
    }
  }, [viewportSize.width])


  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "person",
      },
      {
        Header: "Company",
        accessor: "company",
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
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Orders",
        accessor: "orders",
      },
    ],
    []
  )

  return(
    <DataTable 

      // data prop 
      items={data} 

      // columns prop
      columns={columns} 

      // set page size - default is 5
      defaultPageSize={10} 

      // pass hiddenColumns state if you use it
      hiddenColumns={hiddenColumns} 
    />
  )
}
`
