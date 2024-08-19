import Breadcrumbs from "../../components/Breadcrumbs"
import PageHeader from "../../components/PageHeader"
import {
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Row,
} from "react-bootstrap"
import ChangedFile from "../../components/Docs/ChangedFile"
import { useState } from "react"
export async function getStaticProps() {
  return {
    props: {
      title: "Changelog",
    },
  }
}
export default function Changelog(props) {
  const [collapse, setCollapse] = useState({})
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs
        pages={[{ name: "Docs", link: "/docs/introduction" }]}
        title={props.title}
      />
      <PageHeader title={props.title} />
      <section className="mb-5">
        <Row>
          <Col xl={10}>
            <Card className="mb-4">
              <Card.Header>
                <Badge pill bg="info-light" text="info" className="float-end">
                  2022-12-12
                </Badge>
                <h4 className="card-heading">Version 1.3</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text as="pre">
                  {"-"} <strong>update:</strong> Updated to NextJS 12.3.1, React
                  18.2.0, React Bootstrap 2.5.0, Bootstrap 5.2.0, Leaflet 1.9.1,
                  React-table 7.8.0, {"\n"}
                  {"-"} <strong>new:</strong> Converted from React Image
                  Lightbox to Yet Another React Lightbox for React 18 support
                  (see docs{" "}
                  <a href="https://yet-another-react-lightbox.com/">here</a>)
                  {"\n"}
                  {"-"} <strong>new:</strong> Converted from React
                  @zumper/react-ladda to vanilla Ladda for React 18 support
                  {"\n"}
                  {"-"} <strong>new:</strong> Converted from next-react-svg to
                  @svgr/webpack{"\n"}
                  {"-"} <strong>improvement:</strong> Removed Next Compose
                  Plugins and transformed next.config.js to native Nextjs code
                  {"\n"}
                  {"-"} <strong>fix:</strong> fixed various console and NextJS
                  errors{"\n"}
                </Card.Text>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    setCollapse({ ...collapse, ["130"]: !collapse["130"] })
                  }
                >
                  Show a complete list of changed files
                </Button>
                <Collapse in={collapse["130"]}>
                  <div className="bg-gray-100 p-3 rounded mt-2">
                    <ul className="list-unstyled text-sm mb-0">
                      {v130.map((item) => (
                        <li className="mb-1" key={item.name}>
                          <ChangedFile {...item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>
                <Badge pill bg="info-light" text="info" className="float-end">
                  2022-04-25
                </Badge>
                <h4 className="card-heading">Version 1.2</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text as="pre">
                  - <strong>New:</strong> 4 New dashboards (New default
                  dashboard, E-commerce, CMS, Projects. The original dashboard
                  is now called index-charts)
                  <br />- <strong>New:</strong> Activity / AtGlance /
                  Bestsellers / CardBlock / Contracts / LatestPosts / Orders /
                  People / BarChart2 - Components
                  <br />- <strong>New:</strong> Added new chart styles
                  <br />- <strong>New:</strong> Added timeline widget
                  <br />- <strong>New:</strong> Example of how to retrieve added
                  items added to ChoicesComponent
                  <br />- <strong>New:</strong> Example of how to retrieve
                  content in src/components/Editor/QuillComponent.js
                  <br />- <strong>New/Improved:</strong> exchanged
                  Simple-Datatables plugin with{" "}
                  <a href="https://react-table.tanstack.com/" target="_blank">
                    React Table
                  </a>
                  <br />- <strong>Improved:</strong> Added react-bootstrap
                  SSRProvider
                  <br />- <strong>Fixed:</strong> Overflow issue (login-2,
                  register-2 pages and their HTML counterparts)
                  <br />- <strong>Fixed:</strong> Theming issue fixed (remvoved
                  $primary: false; from variables.scss)
                  <br />- <strong>Fixed:</strong> /charts page example code
                  <br />- <strong>Updated:</strong> Updated dependencies
                  (bootstrap 5.1.3, react-bootstrap 2.2.3, next 12.1.5, choices
                  10.1.0)
                </Card.Text>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    setCollapse({ ...collapse, ["120"]: !collapse["120"] })
                  }
                >
                  Show a complete list of changed files
                </Button>
                <Collapse in={collapse["120"]}>
                  <div className="bg-gray-100 p-3 rounded mt-2">
                    <ul className="list-unstyled text-sm mb-0">
                      {v120.map((item) => (
                        <li className="mb-1" key={item.name}>
                          <ChangedFile {...item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Collapse>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>
                <Badge pill bg="info-light" text="info" className="float-end">
                  2021-08-26
                </Badge>
                <h4 className="card-heading">Version 1.1</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text as="pre">
                  - <strong>New:</strong> 5 E-commerce pages
                  <br />- <strong>New:</strong> 2 Knowledge base pages
                  <br />- <strong>New:</strong> ContactCard, PublishBlock &
                  SupportBlock components
                  <br />- <strong>Improved:</strong> Added light card table
                  header (theme/_card.scss)
                  <br />- <strong>Improved:</strong> Added avatar flag, avatar
                  text, avatar xxs (src/scss/theme/_avatar.scss &
                  src/components/Avatar.js) <br />- <strong>Updated:</strong>{" "}
                  Updated dependencies (next 11.1.0, react-bootstrap
                  2.0.0-beta.4, simple-datatables 3.1.2, react-imask 6.1.0,
                  react-leaflet 3.1.2, react-image-lightbox 5.1.4,
                  @fortawesome/react-fontawesome 0.1.15, chart.js 3.5.1, sass
                  1.38.0)
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>
                <Badge pill bg="info-light" text="info" className="float-end">
                  2021-07-13
                </Badge>
                <h4 className="card-heading">Version 1.0</h4>
              </Card.Header>
              <Card.Body>
                <Card.Text as="pre">Initial release</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
const v130 = [
  {
    name: "package.json",
    type: "m",
  },
  {
    name: "package-lock.json",
    type: "m",
  },
  {
    name: "next.config.js",
    type: "m",
  },
  {
    name: "src/components/Calendar.js",
    type: "m",
  },
  {
    name: "src/components/LoadingButton.js",
    type: "m",
  },
  {
    name: "src/components/ProgressButton.js",
    type: "m",
  },
  {
    name: "src/components/ChoicesComponent.js",
    type: "m",
  },
  {
    name: "src/components/DatepickerComponent.js",
    type: "m",
  },
  {
    name: "src/components/AllFormElements.js",
    type: "m",
  },
  {
    name: "src/pages/charts-gauge-sparkline",
    type: "m",
  },
  {
    name: "src/pages/charts",
    type: "m",
  },
  {
    name: "src/pages/components-calendar",
    type: "m",
  },
  {
    name: "src/pages/components-cards",
    type: "m",
  },
  {
    name: "src/pages/components-gallery",
    type: "m",
  },
  {
    name: "src/pages/components-loading-buttons",
    type: "m",
  },
  {
    name: "src/pages/components-map",
    type: "m",
  },
  {
    name: "src/pages/components-notifications",
    type: "m",
  },
  {
    name: "src/pages/components-preloader",
    type: "m",
  },
  {
    name: "src/pages/cms-category",
    type: "m",
  },
  {
    name: "src/pages/cms-media",
    type: "m",
  },
  {
    name: "src/pages/cms-post-new",
    type: "m",
  },
  {
    name: "src/pages/cms-post",
    type: "m",
  },
  {
    name: "src/pages/ecommerce-customers",
    type: "m",
  },
  {
    name: "src/pages/ecommerce-order",
    type: "m",
  },
  {
    name: "src/pages/ecommerce-orders",
    type: "m",
  },
  {
    name: "src/pages/ecommerce-product-new",
    type: "m",
  },
  {
    name: "src/pages/ecommerce-products",
    type: "m",
  },
  {
    name: "src/pages/forms-advanced",
    type: "m",
  },
  {
    name: "src/pages/forms-dropzone",
    type: "m",
  },
  {
    name: "src/pages/forms-texteditor",
    type: "m",
  },
  {
    name: "src/pages/forms-validation",
    type: "m",
  },
  {
    name: "src/pages/forms",
    type: "m",
  },
  {
    name: "src/pages/login",
    type: "m",
  },
  {
    name: "src/pages/login-2",
    type: "m",
  },
  {
    name: "src/pages/pages-contacts",
    type: "m",
  },
  {
    name: "src/pages/pages-invoice",
    type: "m",
  },
  {
    name: "src/pages/pages-knowledge-base-topic",
    type: "m",
  },
  {
    name: "src/pages/pages-knowledge-base",
    type: "m",
  },
  {
    name: "src/pages/pages-pricing",
    type: "m",
  },
  {
    name: "src/pages/pages-profile",
    type: "m",
  },
  {
    name: "src/pages/register-2",
    type: "m",
  },
  {
    name: "src/pages/register",
    type: "m",
  },
  {
    name: "src/pages/tables-datatable",
    type: "m",
  },
  {
    name: "src/pages/tables",
    type: "m",
  },
  {
    name: "src/pages/widgets-stats",
    type: "m",
  },
  {
    name: "src/pages/widgets-data",
    type: "m",
  },
  {
    name: "src/scss/theme/_other.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_yarl.scss",
    type: "a",
  },
]

const v120 = [
  {
    name: "package.json",
    type: "m",
  },
  {
    name: "package-lock.json",
    type: "m",
  },
  {
    name: "src/components/Choices/ChoicesComponent.js",
    type: "m",
  },
  {
    name: "public/favicon.png",
    type: "m",
  },
  {
    name: "src/components/Activity.js",
    type: "a",
  },
  {
    name: "src/components/AtGlance.js",
    type: "a",
  },
  {
    name: "src/components/Avatar.js",
    type: "m",
  },
  {
    name: "src/components/Bestsellers.js",
    type: "a",
  },
  {
    name: "src/components/CardBlock.js",
    type: "a",
  },
  {
    name: "src/components/CardHeaderMore.js",
    type: "m",
  },
  {
    name: "src/components/Contracts.js",
    type: "a",
  },
  {
    name: "src/components/DataTable/DataTablePagination.js",
    type: "a",
  },
  {
    name: "src/components/DataTable/index.js",
    type: "a",
  },
  {
    name: "src/components/Footer.js",
    type: "m",
  },
  {
    name: "src/components/LatestPosts.js",
    type: "a",
  },
  {
    name: "src/components/Orders.js",
    type: "a",
  },
  {
    name: "src/components/People.js",
    type: "a",
  },
  {
    name: "src/components/QuickDraft.js",
    type: "a",
  },
  {
    name: "src/components/Widgets/ActiveTickets.js",
    type: "m",
  },
  {
    name: "src/components/Widgets/Projects.js",
    type: "m",
  },
  {
    name: "src/components/Widgets/Projects2.js",
    type: "m",
  },
  {
    name: "src/components/Widgets/Stats11.js",
    type: "m",
  },
  {
    name: "src/components/Widgets/Stats5.js",
    type: "m",
  },
  {
    name: "src/components/charts/BarChart.js",
    type: "m",
  },
  {
    name: "src/components/charts/BarChart2.js",
    type: "a",
  },
  {
    name: "src/components/charts/CustomDonutChart.js",
    type: "m",
  },
  {
    name: "src/components/charts/defaults.js",
    type: "m",
  },
  {
    name: "src/data/index-charts.json",
    type: "a",
  },
  {
    name: "src/data/index-projects.json",
    type: "a",
  },
  {
    name: "src/data/index.json",
    type: "m",
  },
  {
    name: "src/data/sidebar.json",
    type: "m",
  },
  {
    name: "src/data/widgets-stats.json",
    type: "m",
  },
  {
    name: "src/pages/_app.js",
    type: "m",
  },
  {
    name: "src/pages/charts.js",
    type: "m",
  },
  {
    name: "src/pages/cms-category.js",
    type: "m",
  },
  {
    name: "src/pages/cms-post.js",
    type: "m",
  },
  {
    name: "src/pages/docs/changelog.js",
    type: "m",
  },
  {
    name: "src/pages/docs/credits.js",
    type: "m",
  },
  {
    name: "src/pages/e-commerce-customers.js",
    type: "m",
  },
  {
    name: "src/pages/e-commerce-orders.js",
    type: "m",
  },
  {
    name: "src/pages/e-commerce-products.js",
    type: "m",
  },
  {
    name: "src/pages/index-charts.js",
    type: "a",
  },
  {
    name: "src/pages/index-cms.js",
    type: "a",
  },
  {
    name: "src/pages/index-e-commerce.js",
    type: "a",
  },
  {
    name: "src/pages/index-projects.js",
    type: "a",
  },
  {
    name: "src/pages/index.js",
    type: "m",
  },
  {
    name: "src/pages/login-2.js",
    type: "m",
  },
  {
    name: "src/pages/register-2.js",
    type: "m",
  },
  {
    name: "src/pages/table-datatable.js",
    type: "m",
  },
  {
    name: "src/pages/widgets-data.js",
    type: "m",
  },
  {
    name: "src/pages/widgets-stats.js",
    type: "m",
  },
  {
    name: "src/scss/theme/_card.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_other.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_utilities.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_utils.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_variables.scss",
    type: "m",
  },
  {
    name: "src/components/Editor/QuillComponent.js",
    type: "m",
  },
]
