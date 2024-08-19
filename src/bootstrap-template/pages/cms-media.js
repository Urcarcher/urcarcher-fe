import {
  Button,
  Card,
  Collapse,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import Image from "../components/CustomImage"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import data from "../data/cms-media.json"
import Dropzone from "../components/Dropzone"
export async function getStaticProps() {
  return {
    props: {
      title: "Media library",
    },
  }
}
export default function CmsMedia(props) {
  const [openDropzone, setOpenDropzone] = useState(false)

  const [lightBoxOpen, setLightBoxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const onClick = (e, index) => {
    e.preventDefault()
    setActiveImage(index)
    setLightBoxOpen(!lightBoxOpen)
  }
  const customStyles = {
    overlay: {
      zIndex: "1000",
    },
    bodyOpen: {
      position: "fixed",
    },
  }
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <div className="page-header d-flex justify-content-between align-items-center">
        <h1 className="page-heading mb-0">{props.title}</h1>
        <div>
          <Button
            variant="primary"
            className="text-uppercase text-nowrap"
            onClick={() => setOpenDropzone(!openDropzone)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add new
          </Button>
        </div>
      </div>
      <Collapse in={openDropzone}>
        <div className="py-2">
          <Dropzone className="bg-transparent rounded-4 mb-5" />
        </div>
      </Collapse>
      <section className="mb-5">
        <Card className="mb-5">
          <Card.Body>
            <Row>
              <Col sm={6}>
                <Form.Select className="d-inline-block w-auto me-3 mb-1 mb-lg-0">
                  <option value="all">All media items</option>
                  <option value="image">Images</option>
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                  <option value="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-word.document.macroEnabled.12,application/vnd.ms-word.template.macroEnabled.12,application/vnd.oasis.opendocument.text,application/vnd.apple.pages,application/pdf,application/vnd.ms-xpsdocument,application/oxps,application/rtf,application/wordperfect,application/octet-stream">
                    Documents
                  </option>
                  <option value="application/vnd.apple.numbers,application/vnd.oasis.opendocument.spreadsheet,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.ms-excel.sheet.binary.macroEnabled.12">
                    Spreadsheets
                  </option>
                  <option value="application/x-gzip,application/rar,application/x-tar,application/zip,application/x-7z-compressed">
                    Archives
                  </option>
                  <option value="unattached">Unattached</option>
                  <option value="mine">Mine</option>
                </Form.Select>
                <Form.Select className="d-inline-block w-auto mb-1 mb-lg-0">
                  <option value="all">All dates</option>
                  <option value="0">February 2021</option>
                  <option value="1">January 2021</option>
                  <option value="2">December 2020</option>
                  <option value="3">November 2020</option>
                  <option value="4">September 2020</option>
                  <option value="5">August 2020</option>
                  <option value="6">July 2020</option>
                  <option value="7">June 2020</option>
                  <option value="8">May 2020</option>
                  <option value="9">April 2020</option>
                  <option value="10">March 2020</option>
                </Form.Select>
              </Col>
              <Col sm={6} className="text-md-end">
                <Form.Label
                  className="text-muted text-sm me-2 d-none d-lg-inline-block"
                  htmlFor="media_search"
                >
                  Search
                </Form.Label>
                <Form.Control
                  className="form-control d-inline-block w-auto"
                  id="media_search"
                  type="search"
                  placeholder="Fulltext search"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Row>
          {data.media.map((item, index) => (
            <Col xs={6} md={4} lg={3} xl={2} key={index}>
              <Card className="position-relative mb-4">
                <Image
                  src={item.img}
                  alt={item.name}
                  className="card-img-top"
                  layout="responsive"
                  width={600}
                  height={400}
                  sizes="(max-width: 530px) 50vw, (max-width: 992px) 33vw, (max-width: 1150px) 25vw, 17vw"
                />

                <Card.Body className="py-2 px-4">
                  <Card.Text className="text-muted text-sm">
                    {item.name}
                  </Card.Text>
                </Card.Body>
                <a
                  className="glightbox stretched-link"
                  href="#"
                  onClick={(e) => onClick(e, index)}
                ></a>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      <Lightbox
        open={lightBoxOpen}
        close={() => setLightBoxOpen(false)}
        slides={data?.media?.map((image) => ({
          alt: image.alt,
          src: image.img,
        }))}
        index={activeImage}
      />
    </Container>
  )
}
