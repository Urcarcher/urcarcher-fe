import Breadcrumbs from "../../components/Breadcrumbs"
import PageHeader from "../../components/PageHeader"
import { Card, Col, Container, Row } from "react-bootstrap"
export async function getStaticProps() {
  return {
    props: {
      title: "Credits",
    },
  }
}
export default function Credits(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs
        pages={[{ name: "Docs", link: "/docs/introduction" }]}
        title={props.title}
      />
      <PageHeader title={"Docs - " + props.title} />
      <section className="mb-5">
        <Row>
          <Col xl={10}>
            <Card className="mb-4">
              <Card.Header>
                <h4 className="card-heading"></h4>
              </Card.Header>
              <Card.Body>
                <div id="credits" className="docs-item">
                  <ul>
                    <li className="mb-3">
                      <a href="https://getbootstrap.com/">Bootstrap</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://react-bootstrap.github.io/">
                        React Bootstrap
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://sass-lang.com/">SASS</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://reactjs.org/">React.js</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://nextjs.org/">Next.js</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://fonts.google.com/specimen/Poppins">
                        Google Fonts - Poppins
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://orioniconlibrary.com">Orion Icons</a>
                    </li>
                    <li className="mb-3">
                      <a href="http://fontawesome.io/get-started/">
                        Font Awesome{" "}
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://leafletjs.com/">LeafletJS</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://react-leaflet.js.org/">React Leaflet</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://refreshless.com/nouislider/">
                        NoUI Slider
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://github.com/mmarkelov/react-nouislider">
                        React NoUI Slider
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://yet-another-react-lightbox.com/">
                        Yet Another React Lightbox
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://www.dropzonejs.com/">Dropzone.js</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://react-dropzone.js.org/">
                        react-dropzone
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://github.com/apal21/nextjs-progressbar">
                        Next.js Progressbar
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://www.chartjs.org/">Chart.js</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://joshuajohnson.co.uk/Choices/">
                        Choices.js
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://formik.org/">Formik</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://github.com/nhn/toast-ui.react-calendar">
                        TOAST UI Calendar
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://bernii.github.io/gauge.js/">Gauge.js</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://lab.hakim.se/ladda/">Ladda</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://github.com/jsdir/react-ladda">
                        React-Ladda
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://github.com/fnando/sparkline">
                        Sparkline
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://quilljs.com/">Quill.js</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://react-table.tanstack.com/">
                        React Table
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://imask.js.org/">IMask</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://github.com/uNmAnNeR/imaskjs/tree/master/packages/react-imask">
                        React IMask
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://github.com/jquense/yup">YUP</a>
                    </li>
                    <li className="mb-3">
                      <a href="https://unsplash.com/collections/3372734/directory">
                        Unsplash
                      </a>
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
