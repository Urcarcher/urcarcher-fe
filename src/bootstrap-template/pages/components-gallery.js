import { Card, Col, Container, Row } from "react-bootstrap"
import Image from "../components/CustomImage"

import Breadcrumbs from "../components/Breadcrumbs"
import PageHeader from "../components/PageHeader"

import data from "../data/gallery.json"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import ExampleCode from "../components/ExampleCode"
export async function getStaticProps() {
  return {
    props: {
      title: "Gallery",
    },
  }
}

export default function ComponentsCalendar(props) {
  const [lightBoxOpen, setLightBoxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const onClick = (index) => {
    setActiveImage(index)
    setLightBoxOpen(!lightBoxOpen)
  }

  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <section>
        <Row>
          {data.map((item, index) => (
            <Col xs={6} md={4} lg={3} key={index}>
              <Card className="mb-4">
                <div style={{ cursor: "pointer" }}>
                  <Image
                    src={item.img}
                    alt={item.caption.title}
                    className="card-img-top"
                    layout="responsive"
                    width={600}
                    height={400}
                    sizes="(max-width: 530px) 50vw, (max-width: 992px) 33vw, 20vw"
                    onClick={() => onClick(index)}
                  />
                </div>
                <Card.Body className="p-3 p-lg-4">
                  <Card.Title as="h6" className="fw-bold mb-1">
                    {item.caption.title}
                  </Card.Title>
                  <Card.Text className="text-muted text-sm">
                    {item.caption.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Card className="mb-4">
          <Card.Header>
            <h4 className="card-heading">Lightbox</h4>
          </Card.Header>
          <Card.Body>
            <p>React Image Lightbox is a lightweight react lightbox plugin.</p>
            <p>
              You can configure lightbox to your needs in{" "}
              <code>src/components/Lightbox.js</code>. Follow instructions in
              plugins{" "}
              <a href="https://github.com/frontend-collective/react-image-lightbox">
                documentation
              </a>
              .
            </p>
            <ExampleCode highlightCode={highlightCode} />
          </Card.Body>
        </Card>
      </section>
      <Lightbox
        open={lightBoxOpen}
        close={() => setLightBoxOpen(false)}
        slides={data?.map((image) => ({
          alt: image.caption.title,
          src: image.img,
        }))}
        index={activeImage}
      />
    </Container>
  )
}

const highlightCode = `import Lightbox from "../components/Lightbox"
import { Col, Row } from "react-bootstrap"
import Image from "../components/CustomImage"

export default function page(props) {

  const data = [
    {
      "img": "/img1.jpg",
      "caption": {
        "title": "Image 1",
        "text": "Image sample text"
      }
    },
    {
      "img": "/img2.jpg",
      "caption": {
        "title": "Image 2",
        "text": "Image sample text"
      }
    },
    {
      "img": "/img3.jpg",
      "caption": {
        "title": "Image 3",
        "text": "Image sample text"
      }
    },
  ]

  // Lightbox state
  const [lightBoxOpen, setLightBoxOpen] = useState(false)

  // Active image state
  const [activeImage, setActiveImage] = useState(0)

  // On image click
  const onClick = (index) => {
    setActiveImage(index) // Set current active image
    setLightBoxOpen(!lightBoxOpen) // Open lightbox
  }

  return(
    <Row>
      {data.map((item, index) => (
        <Col xs={6} key={index}>
          <Image
            src={item.img}
            alt={item.caption.title}
            layout="responsive"
            width={600}
            height={400}
            onClick={() => onClick(index)}
          />
        </Col>
      ))}

      <Lightbox
        open={lightBoxOpen}
        close={() => setLightBoxOpen(false)}
        slides={data?.map((image) => ({
          alt: image.caption.title,
          src: image.img,
        }))}
        index={activeImage}
      />
    </Row>
  )
}`
