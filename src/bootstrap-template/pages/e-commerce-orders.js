import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, Container } from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import Orders from "../components/Orders"
export async function getStaticProps() {
  return {
    props: {
      title: "Orders",
    },
  }
}
export default function ECommerceOrders(props) {
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

      <Orders />
    </Container>
  )
}
