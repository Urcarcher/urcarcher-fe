import { Col, Container, Row } from "react-bootstrap"

import Breadcrumbs from "../components/Breadcrumbs"
import PageHeader from "../components/PageHeader"
import ActiveTickets from "../components/Widgets/ActiveTickets"
import Customers from "../components/Widgets/Customers"
import Members from "../components/Widgets/Members"
import Orders from "../components/Widgets/Orders"
import Posts from "../components/Widgets/Posts"
import Products from "../components/Widgets/Products"
import Projects from "../components/Widgets/Projects"
import Projects2 from "../components/Widgets/Projects2"
import Tickets from "../components/Widgets/Tickets"
import ToDoList from "../components/Widgets/ToDoList"
import Updates from "../components/Widgets/Updates"

import data from "../data/widgets-data.json"

export async function getStaticProps() {
  return {
    props: {
      title: "Data Widgets",
    },
  }
}

export default function WidgetsData(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <Row>
        <Col lg={6} className="mb-4">
          {/* Tickets widget */}
          <Tickets data={data.tickets} />
        </Col>
        <Col lg={6} className="mb-4">
          {/* Latest posts widget */}
          <Posts data={data.posts} />
        </Col>
      </Row>
      <Row>
        <Col lg={8} className="mb-4">
          {/* Projects widget */}
          <Projects data={data.projects} />
        </Col>
        <Col lg={4} className="mb-4">
          {/* Team members widget */}
          <Members data={data.members} />
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="mb-4">
          {/* To do list widget */}
          <ToDoList />
        </Col>
        <Col lg={6} className="mb-4">
          {/* Projects 2 widget */}
          <Projects2 data={data.projects2} addForm />
        </Col>
        <Col xs={12} className="mb-4">
          {/* Active tickets widget */}
          <ActiveTickets data={data.activeTickets} />
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="mb-4">
          {/* Latest customers widget */}
          <Customers data={data.customers} />
        </Col>
        <Col lg={6} className="mb-4">
          {/* Latest customers widget */}
          <Updates data={data.updates} />
        </Col>
      </Row>
      {/* Products widget */}
      <Products data={data.products} />
      {/* Orders widget */}
      <Orders data={data.orders} />
    </Container>
  )
}
