import { useState } from "react"
import { faDownload, faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Row,
  Col,
  Card,
  Container,
  Form,
  Button,
  InputGroup,
  Badge,
} from "react-bootstrap"
import Breadcrumbs from "../components/Breadcrumbs"
import Image from "../components/CustomImage"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Dropzone from "../components/Dropzone"
import Editor from "../components/Editor"
import { Choices } from "../components/Choices"
import media from "../data/cms-media.json"
import data from "../data/cms-post-new.json"
import brands from "../data/tables-datatable.json"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"
import PublishBlock from "../components/PublishBlock"

export async function getStaticProps() {
  return {
    props: {
      title: "Edit product",
    },
  }
}
export default function ECommerceProductNew(props) {
  const [lightBoxOpen, setLightBoxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const onClick = (e, index) => {
    e.preventDefault()
    setActiveImage(index)
    setLightBoxOpen(!lightBoxOpen)
  }

  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs
        title={props.title}
        pages={[{ name: "Products", link: "/e-commerce-products" }]}
      />
      <div className="page-header">
        <h1 className="page-heading">{props.title}</h1>
        <ul className="list-inline text-sm">
          <li className="list-inline-item">
            <a className="text-gray-600" href="#!">
              <FontAwesomeIcon icon={faCopy} className="me-2" />
              Print
            </a>
          </li>
          <li className="list-inline-item">
            <a className="text-gray-600" href="#!">
              <FontAwesomeIcon icon={faDownload} className="me-2" />
              Export
            </a>
          </li>
        </ul>
      </div>
      <section>
        <Row className="mb-5">
          <Col lg={8} xxl={9} className="mb-4 mb-lg-0">
            {/* MAIN INFO */}
            <Card className="mb-4">
              <Card.Header>
                <div className="card-heading">Main Info</div>
              </Card.Header>
              <Card.Body>
                <Form.Label htmlFor="postTitle">Title</Form.Label>
                <Form.Control id="postTitle" type="text" className="mb-4" />
                <Button variant="outline-primary" className="mb-4">
                  Add Media
                </Button>
                <Editor withEditor text={data.text} />
              </Card.Body>
            </Card>
            {/* END MAIN INFO */}

            {/* PRICES & STOCK */}
            <Card className="mb-4">
              <Card.Header>
                <div className="card-heading">Prices & Stock</div>
              </Card.Header>
              <Card.Body>
                <Row className="gy-3">
                  <Col xs={12}>
                    <Form.Label className="fw-bold" htmlFor="main-price">
                      Main Price
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control type="text" id="main-price" />
                    </InputGroup>
                  </Col>
                  <Col xs={12} lg={6} className="text-sm">
                    <Form.Label className="text-muted" htmlFor="regular-price">
                      Regular Price
                    </Form.Label>
                    <Form.Check type="switch" className="float-end" />
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control type="text" id="regular-price" />
                    </InputGroup>
                  </Col>
                  <Col xs={12} lg={6} className="text-sm">
                    <Form.Label
                      className="text-muted"
                      htmlFor="discounted-price"
                    >
                      Discounted Price
                    </Form.Label>
                    <Form.Check type="switch" className="float-end" />
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control type="text" id="discounted-price" />
                    </InputGroup>
                  </Col>
                </Row>
                <hr className="bg-gray-500 my-4" />
                <Form.Label className="fw-bold" htmlFor="items-stock">
                  Items in stock
                </Form.Label>
                <Form.Control type="text" id="items-stock" />
              </Card.Body>
            </Card>
            {/* END PRICES & STOCK */}

            {/* IMAGES */}
            <Card className="mb-4">
              <Card.Header>
                <div className="card-heading">Images</div>
              </Card.Header>
              <Card.Body>
                <Row className="gy-4 mb-4">
                  {media.media.map(
                    (item, index) =>
                      index < 7 && (
                        <Col xs={6} md={4} key={index}>
                          <Card className="display-hover">
                            <div style={{ cursor: "pointer" }}>
                              <Image
                                src={item.img}
                                alt={item.name}
                                className="card-img-top"
                                layout="responsive"
                                width={600}
                                height={400}
                                sizes="(max-width: 530px) 50vw, (max-width: 992px) 33vw, (max-width: 1150px) 25vw, 17vw"
                                onClick={(e) => onClick(e, index)}
                              />
                            </div>

                            <Card.Body className="p-3">
                              <div className="d-flex align-items-center justify-content-between">
                                <p className="mb-0 text-muted text-sm">
                                  {item.name} das dad ad adas
                                </p>
                                <Badge
                                  bg="primary-light"
                                  text="primary"
                                  as="a"
                                  className="text-base flex-shrink-0 display-hover-content"
                                  href="#!"
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </Badge>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                  )}
                </Row>
                <Dropzone className="bg-gray-100 rounded-4" />
              </Card.Body>
            </Card>
            {/* END IMAGES */}
          </Col>

          <Col lg={4} xxl={3}>
            {/* PUBLISH */}
            <PublishBlock />
            {/* END PUBLISH */}

            {/* CATEGORIZATION */}
            <Card className="shadow-sm mb-4">
              <Card.Header className="py-4">
                <h4 className="card-heading">Categorization</h4>
              </Card.Header>
              <Card.Body>
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  {data.categoriesBlock.items.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
                <hr className="bg-gray-500 my-4" />
                <Form.Label>Brands</Form.Label>
                <Form.Select>
                  {brands.map((item, index) => (
                    <option value={index} key={index}>
                      {item.company}
                    </option>
                  ))}
                </Form.Select>
                <hr className="bg-gray-500 my-4" />
                <Form.Label>Collection</Form.Label>
                <Form.Select>
                  <option value="">Not Set</option>
                  {["Spring", "Summer", "Autumn", "Winter"].map(
                    (item, index) => (
                      <option value={index} key={index}>
                        {item}
                      </option>
                    )
                  )}
                </Form.Select>
                <hr className="bg-gray-500 my-4" />
                <Form.Label>Tags</Form.Label>
                <Choices
                  defaultValue={data.tags.items}
                  placeholder="Enter something"
                  id="tags"
                />
              </Card.Body>
            </Card>
            {/* END CATEGORIZATION */}

            {/* FORMAT */}
            {data.formatBlock && (
              <Card className="shadow-sm mb-4">
                <Card.Header className="py-4">
                  <h4 className="card-heading">{data.formatBlock.name}</h4>
                </Card.Header>
                <Card.Body>
                  {data.formatBlock.items.map((item) => (
                    <Form.Check {...item} type="radio" key={item.id} />
                  ))}
                </Card.Body>
              </Card>
            )}
            {/* END FORMAT */}
          </Col>
        </Row>
      </section>
      <Lightbox
        open={lightBoxOpen}
        close={() => setLightBoxOpen(false)}
        slides={media?.media?.map((image) => ({
          alt: image.alt,
          src: image.img,
        }))}
        index={activeImage}
      />
    </Container>
  )
}
