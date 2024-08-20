import { faFile } from "@fortawesome/free-regular-svg-icons"
import { faAngleDoubleRight, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import {
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Button,
  Card,
  Badge,
} from "react-bootstrap"
import SupportBlock from "../components/SupportBlock"
import Breadcrumbs from "../components/Breadcrumbs"
import Icon from "../components/Icon"
import PageHeader from "../components/PageHeader"
import data from "../data/knowledge-base.json"
import ContactCard from "../components/ContactCard"
export async function getStaticProps() {
  return {
    props: {
      title: "Knowledge Base",
    },
  }
}

export default function PagesKnowledgeBase(props) {
  return (
    <Container fluid className="px-lg-4 px-xl-5">
      <Breadcrumbs title={props.title} />
      <PageHeader title={props.title} />
      <Row className="mb-3">
        <Col lg={6}>
          <p>
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col lg={5}>
          <InputGroup>
            <Form.Control type="text" placeholder="Search Something ... " />
            <Button variant="outline-primary" type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="py-5 gy-4">
        {data.blocks.map((block) => (
          <Col
            sm={6}
            xl={4}
            xxl={3}
            className="mb-3 mb-lg-0 text-center"
            key={block.name}
          >
            <Card className="shadow-sm hover-animate h-100">
              <Card.Body>
                <div
                  className={`icon icon-xl mx-auto mb-4 bg-${block.color}-light`}
                >
                  <Icon icon={block.icon} className={`text-${block.color}`} />
                </div>

                <h3 className="h5">{block.name}</h3>
                <Card.Text className="text-muted text-sm">
                  {block.content}
                </Card.Text>
                <Link href="/pages-knowledge-base-topic">
                  <a className="stretched-link">
                    <span className="sr-only">See Topic </span>
                  </a>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="bg-white py-5 mx-n3 mx-lg-n4 mx-xl-n5 px-3 px-lg-4 px-xl-5">
        <Row className="my-5 px-xl-5">
          <Col md={8}>
            <p className="subtitle text-primary">What do you need to know? </p>
            <h2>Choose Your Topic</h2>
          </Col>
          <Col
            md={4}
            className="d-lg-flex align-items-center justify-content-end"
          >
            <a className="text-muted text-sm" href="#!">
              See all topics
              <FontAwesomeIcon icon={faAngleDoubleRight} className="ms-2" />
            </a>
          </Col>
        </Row>
        <Row className="gy-4 px-xl-5">
          {data.categories.map((category) => (
            <Col lg={4} xxl={3} key={category.name}>
              <h3 className="h5 text-dark d-flex align-items-center mb-4">
                <Link href={category.link}>
                  <a className="text-reset">
                    <Badge
                      bg="primary-light"
                      text="primary"
                      className="py-1 me-1"
                    >
                      {category.count}
                    </Badge>
                    {category.name}
                  </a>
                </Link>
              </h3>
              <ul className="list-unstyled ms-3 text-sm">
                {category.topisc.map((topic, index) => (
                  <li className="mb-2" key={index}>
                    <Link href={topic.link}>
                      <a className="text-muted">
                        <FontAwesomeIcon icon={faFile} className="me-2" />
                        {topic.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </div>
      <Row className="bg-gray-200 py-5 mx-n3 mx-lg-n4 mx-xl-n5 px-3 px-lg-4 px-xl-5">
        <Col lg={10} xl={8} className="mx-auto text-center py-5">
          <SupportBlock />
        </Col>
      </Row>
      <Row>
        <Col md={8} lg={6} xxl={4} className="mx-auto">
          <ContactCard />
        </Col>
      </Row>
    </Container>
  )
}
